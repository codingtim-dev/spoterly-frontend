import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from '../components/navbar/navbar.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MapViewComponent} from '../components/map/map-view/map-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LeafletModule, MapViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spoterly-frontend';
}
