import { Component } from '@angular/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {Map, circle, latLng, marker, polygon, tileLayer, Icon, icon} from 'leaflet';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [
    LeafletModule
  ],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss'
})
export class MapViewComponent {

  onMapReady(map: Map) {
    // when map is initialized and ready for manipulation, get all coordinates to create markers
  }


  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }),
      marker([0,0], {
        icon: icon({
          ...Icon.Default.prototype.options,
          iconUrl: 'assets/marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      })
    ],
    zoom: 10,
    center: latLng(0, 0),
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'Big Circle': circle([ 0, 0 ], { radius: 5000 }),
      'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  }


  onMapClick(event: any) {
    const { lat, lng } = event.leafletEvent.latlng;
    // Add marker logic here
    console.log(`Clicked at: ${lat}, ${lng}`);
  }
}
