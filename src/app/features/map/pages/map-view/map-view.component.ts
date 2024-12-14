import {AfterViewInit, Component, inject} from '@angular/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import Spot from '../../models/Spot';
import {SpotDetailsComponent} from '../../components/spot-details/spot-details.component';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {AddPostDialogComponent} from '../../../../components/add-post-dialog/add-post-dialog.component';
import {NgClass, NgIf} from '@angular/common';
import {AddSpotDialogComponent} from '../../../../components/add-spot-dialog/add-spot-dialog.component';
import {SpotService} from '../../../../services/spot/spot.service';
import {AuthService} from '../../../../services/auth/auth.service';

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
    SpotDetailsComponent,
    FormsModule,
    MatIcon,
    MatIconButton,
    MatButton,
    NgIf,
    NgClass,
  ],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
})
export class MapViewComponent implements AfterViewInit {
  selectedSpot: any;
  readonly dialog = inject(MatDialog);
  showSpotDetails = false;
  spotList: Spot[] = [];

  showActions: boolean = false;
  targetMarker: any = null;
  private map!: L.Map;
  private markers: L.Marker[] = [];


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

  fetchSpotList() {

    if (this.markers.length > 0) {
      this.markers = []
    }

    this.spotService.getSpots().subscribe((data) => {
      data.map((value) => {
        this.markers.push(
          new L.Marker([value.latitude, value.longitude], {
            icon: locationIcon,
          })
            .bindPopup(value.name)
            .on('click', () => this.onClickMarker(value))
            .on('popupclose', () => this.onPopupClose()),
        );
      });

      this.addMarkersToMap()
      this.centerMap();
    });
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
      console.log('Dialog was closed');
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
        this.fetchSpotList();
      }

    });
  }

  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map');
    L.tileLayer(baseMapURl, {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.map.on('click', (event) => {

      if (this.authService.isAuthenticated() && !this.showSpotDetails) {
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

    this.fetchSpotList()
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
