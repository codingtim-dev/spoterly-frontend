import {Component, importProvidersFrom} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './features/navbar/navbar.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MapViewComponent} from './features/map/pages/map-view/map-view.component';
import {LoginComponent} from './core/auth/pages/login/login.component';
import {RegisterComponent} from './core/auth/pages/register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import {AngularSvgIconModule} from 'angular-svg-icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LeafletModule, MapViewComponent, LoginComponent, RegisterComponent, MatFormFieldModule, MatInputModule, HttpClientModule, AngularSvgIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spoterly-frontend';

  auth: boolean = false;
  showSignUp = false;

  showRegister(showSignUp: boolean) {
    this.showSignUp = showSignUp;
  }

  isAuthenticated(auth: boolean) {
    this.auth = auth;
  }
}
