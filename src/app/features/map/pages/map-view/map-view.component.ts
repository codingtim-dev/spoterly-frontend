import {AfterViewInit, Component, inject} from '@angular/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import Spot from '../../models/Spot';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {AddPostDialogComponent} from '../../../../components/add-post-dialog/add-post-dialog.component';
import {NgClass, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {AddSpotDialogComponent} from '../../../../components/add-spot-dialog/add-spot-dialog.component';
import {SpotService} from '../../../../services/spot/spot.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {Observable} from 'rxjs';
import {SpotDetailsComponent} from '../../components/spot-details/spot-details.component';
import {SpotCardComponent} from '../../components/spot-card/spot-card.component';

const locationIcon = L.icon({
  iconUrl: 'assets/icons/Marker.svg',
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: 'marker',
});

interface eventCoordinates {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [
    LeafletModule,
    FormsModule,
    MatIcon,
    MatIconButton,
    MatButton,
    NgIf,
    NgClass,
    NgForOf,
    SpotCardComponent,
    SpotDetailsComponent,
    SlicePipe,
  ],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
})
export class MapViewComponent implements AfterViewInit {
  selectedSpot: any;
  readonly dialog = inject(MatDialog);
  showSpotDetails = false;
  spotList$?: Observable<Spot[]>;

  showActions: boolean = false;
  targetMarker: any = null;
  visibleSpots: Spot[] = [];
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private currentBounds: L.LatLngBounds | null = null;
  private markersMap = new Map<string, L.Marker>();

  constructor(
    private spotService: SpotService,
    private authService: AuthService,
  ) {
  }

  showMapElements() {
    return this.authService.isAuthenticated();
  }

  // instantiate the map when the DOM is fully loaded
  ngAfterViewInit() {
    this.initMap();
  }

  fetchSpotList(bounds: L.LatLngBounds) {
    const params = {
      minLatitude: bounds.getSouth(),
      maxLatitude: bounds.getNorth(),
      minLongitude: bounds.getWest(),
      maxLongitude: bounds.getEast(),
    };

    this.spotList$ = this.spotService.getSpots(params);

    this.spotList$.subscribe((data) => {
      const newSpotIds = new Set(data.map((spot) => spot.id));

      // Remove all markers which are not in the view anymore
      this.markersMap.forEach((marker, id) => {
        if (!newSpotIds.has(id)) {
          this.map.removeLayer(marker);
          this.markersMap.delete(id);
        }
      });

      data.forEach((spot) => {
        if (!this.markersMap.has(spot.id)) {
          const marker = new L.Marker([spot.latitude, spot.longitude], {
            icon: locationIcon,
          })
            .bindPopup(spot.name)
            .on('click', () => this.onClickMarker(spot))
            .on('popupclose', () => this.onPopupClose());

          this.markersMap.set(spot.id, marker);
          marker.addTo(this.map);
        }
      });

      this.updateVisibleSpots(data);
    });
  }

  trackBySpotId(index: number, spot: Spot): string {
    return spot.id;
  }

  closeDialog(value: boolean) {
    this.showSpotDetails = value;
  }

  onPopupClose() {
    this.selectedSpot = null;
    this.showSpotDetails = false;
  }

  onClickMarker(spot: Spot): void {
    this.selectedSpot = spot;
    this.showSpotDetails = true;
  }

  openDetails(spot: Spot): void {
    this.selectedSpot = spot;
    this.showSpotDetails = true;
  }

  closeDetails() {
    this.showSpotDetails = false;
    this.selectedSpot = null;
  }

  toggleActions() {
    this.showActions = !this.showActions;
  }

  openCreateNewPostDialog() {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      data: 'test',
      height: '800px',
      width: '520px',
    });

    this.showActions = false;

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  openCreateNewSpotDialog(coordinates: eventCoordinates) {
    const dialogRef = this.dialog.open(AddSpotDialogComponent, {
      data: coordinates,
      height: '620px',
      width: '520px',
      panelClass: 'custom-dialog-panel',
    });

    this.showActions = false;

    dialogRef.afterClosed().subscribe((result) => {

      if (this.targetMarker != null) {
        this.map.removeLayer(this.targetMarker);
      }

      if (result != null) {
        // refresh map markers
        this.markers.push(this.targetMarker)
        this.addMarkersToMap()
        this.fetchSpotList(this.map.getBounds());
      }

    });
  }

  private updateVisibleSpots(spots: Spot[]) {
    this.visibleSpots = spots.filter((spot) =>
      this.currentBounds?.contains([spot.latitude, spot.longitude])
    );
  }

  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map');

    this.centerMap();

    L.tileLayer(baseMapURl, {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);


    this.map.on('moveend', () => {
      this.currentBounds = this.map.getBounds();
      this.fetchSpotList(this.currentBounds);
    });

    this.map.on('click', (event) => {

      this.closeDetails()

      if (this.authService.isAuthenticated()) {
        // handle that users wants to add a spot while clicking on map
        if (this.targetMarker !== null) {
          this.map.removeLayer(this.targetMarker);
        }

        // Add marker icon on map
        this.targetMarker = L.marker([event.latlng.lat, event.latlng.lng], {icon: locationIcon}).addTo(this.map);

        // Open create Spot dialog
        this.openCreateNewSpotDialog({latitude: event.latlng.lat, longitude: event.latlng.lng})
      }

    })


    this.currentBounds = this.map.getBounds();
    this.fetchSpotList(this.currentBounds)
  }

  private addMarkersToMap() {
    // Add your markers to the map
    this.markers.forEach((marker) => marker.addTo(this.map));
  }

  private centerMap() {
    // Create a LatLngBounds object to encompass all the marker locations

    if (this.markers.length > 0) {
      const bounds = L.latLngBounds(
        this.markers.map((marker) => marker.getLatLng()),
      );

      this.map.fitBounds(bounds);
      return;
    }

    // no spots found ? set map view and bounds to Leipzig
    const leipzigBounds = L.latLngBounds(
      [51.297, 12.296], // Southwest corner
      [51.423, 12.504], // Northeast corner
    );
    // Fit the map view to the bounds
    this.map.fitBounds(leipzigBounds);
  }
}
