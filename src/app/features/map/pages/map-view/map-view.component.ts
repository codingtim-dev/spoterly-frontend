import { AfterViewInit, Component, inject } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import Spot from '../../models/Spot';
import { SpotDetailsComponent } from '../../components/spot-details/spot-details.component';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddPostDialogComponent } from '../../../../components/add-post-dialog/add-post-dialog.component';
import { NgClass, NgIf } from '@angular/common';
import { AddSpotDialogComponent } from '../../../../components/add-spot-dialog/add-spot-dialog.component';
import { SpotService } from '../../../../services/spot/spot.service';

const locationIcon = L.icon({
  iconUrl: 'assets/icons/Marker.svg',
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: 'marker',
});

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
  private map!: L.Map;
  // async call to http get method, retrieving the spots from the database
  private markerList = this.spotList.map((value) =>
    new L.Marker([value.latitude, value.longitude], { icon: locationIcon })
      .bindPopup(value.name)
      .on('click', () => this.onClickMarker(value))
      .on('popupclose', () => this.onPopupClose()),
  );
  markers: L.Marker[] = this.markerList;

  constructor(private spotService: SpotService) {}

  // instantiate the map when the DOM is fully loaded
  ngAfterViewInit() {
    this.initMap();
  }

  fetchSpotList() {
    // fetch spots and put markers on map
    this.spotService.getSpots().subscribe((data) => {
      data.map((value) => {
        this.markerList.push(
          new L.Marker([value.latitude, value.longitude], {
            icon: locationIcon,
          })
            .bindPopup(value.name)
            .on('click', () => this.onClickMarker(value))
            .on('popupclose', () => this.onPopupClose()),
        );
      });

      this.updateMarker();
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

  openCreateNewSpotDialog() {
    const dialogRef = this.dialog.open(AddSpotDialogComponent, {
      height: '620px',
      width: '520px',
      panelClass: 'custom-dialog-panel',
    });

    this.showActions = false;

    dialogRef.afterClosed().subscribe((result) => {
      // refresh map markers
      this.fetchSpotList();
    });
  }

  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map');
    L.tileLayer(baseMapURl, {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    //this.fetchSpotList()
  }

  private addMarkers() {
    // Add your markers to the map
    this.markerList.forEach((marker) => marker.addTo(this.map));
  }

  private updateMarker() {
    this.markers = this.spotList.map((value) =>
      new L.Marker([value.latitude, value.longitude], { icon: locationIcon })
        .bindPopup(value.name)
        .on('click', () => this.onClickMarker(value))
        .on('popupclose', () => this.onPopupClose()),
    );

    // refresh marker on map
    this.addMarkers();
  }

  private centerMap() {
    // Create a LatLngBounds object to encompass all the marker locations

    if (this.markerList.length > 0) {
      const bounds = L.latLngBounds(
        this.markerList.map((marker) => marker.getLatLng()),
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
