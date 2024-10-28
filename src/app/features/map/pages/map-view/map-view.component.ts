import {AfterViewInit, Component, inject} from '@angular/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import Spot from '../../models/Spot';
import {mockSpotList} from '../../models/mockSpotList';
import {SpotDetailsComponent} from '../../components/spot-details/spot-details.component';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {AddPostDialogComponent} from '../../../../components/add-post-dialog/add-post-dialog.component';
import {NgClass, NgIf} from '@angular/common';
import {AddSpotDialogComponent} from '../../../../components/add-spot-dialog/add-spot-dialog.component';


const locationIcon = L.icon({
    iconUrl: 'assets/icons/Marker.svg',
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    className: "marker"
  }
)

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
    NgClass
  ],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss'
})
export class MapViewComponent implements AfterViewInit {

  private map!: L.Map;
  mockSpot: Spot[] = mockSpotList;
  selectedSpot: any;
  readonly dialog = inject(MatDialog);
  showDetails = false;

  showActions: boolean = true;


  // async call to http get method, retrieving the spots from the database
  private mockMarkersList = this.mockSpot.map(value =>
    new L.Marker(
      [value.latitude, value.longitude],
      {icon: locationIcon}).bindPopup(value.title).on('click', () => this.onClickMarker(value) ).on('popupclose', () => this.onPopupClose()));

  markers: L.Marker[] = this.mockMarkersList;


  // instantiate the map when the DOM is fully loaded
  ngAfterViewInit() {
    this.initMap();
    this.addMarkers();
    this.centerMap();
  }


  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl, {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this.map);
  }


  private addMarkers() {
    // Add your markers to the map
    this.markers.forEach(marker => marker.addTo(this.map));
  }

  private centerMap() {
    // Create a LatLngBounds object to encompass all the marker locations
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));

    // Fit the map view to the bounds
    this.map.fitBounds(bounds);
  }

  closeDialog(value: boolean) {
    this.showDetails = value;
  }

  onPopupClose() {
    this.selectedSpot = null;
    this.showDetails = false
  }

  onClickMarker(spot: Spot): void {
    this.selectedSpot = spot
    this.showDetails = true;
  }

  toggleActions() {
    this.showActions = !this.showActions;
  }

  openCreateNewPostDialog() {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      data: "test",
      height: '800px',
      width: '520px',
    });

    this.showActions = false;

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed")
    })
  }

  openCreateNewSpotDialog() {
    const dialogRef = this.dialog.open(AddSpotDialogComponent, {
      data: "test",
      height: '620px',
      width: '520px',
      panelClass: 'custom-dialog-panel'
    });

    this.showActions = false;

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed")
    })
  }
}
