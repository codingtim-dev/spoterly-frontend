import {AfterViewInit, Component} from '@angular/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import {icon} from 'leaflet';


const locationIcon = L.icon({
    iconUrl: '../',
    iconSize: [25, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  }
)

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [
    LeafletModule
  ],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss'
})
export class MapViewComponent implements AfterViewInit {

  private map!: L.Map;
  markers: L.Marker[] = [
    L.marker([31.9539, 35.9106], {icon: locationIcon}),
    L.marker([32.5568, 35.8469])
  ];

  size =  20;



  // instantiate the map when the DOM is fully loaded
  ngAfterViewInit() {
    this.initMap();
    this.addMarkers();
    this.centerMap();
  }


  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
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






  // onMapClick(event: any) {
  //   console.log(event.latlng);
  //   // Add marker logic here
  //
  //   const newMarker =  marker([event.latlng.lat, event.latlng.lng], {
  //     icon: icon({
  //       ...Icon.Default.prototype.options,
  //       iconUrl: 'assets/marker-icon.png',
  //       iconRetinaUrl: 'assets/marker-icon-2x.png',
  //       shadowUrl: 'assets/marker-shadow.png'
  //     })
  //   } );
  //
  // }
}
