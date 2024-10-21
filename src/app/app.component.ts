import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from '../components/navbar/navbar.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MapViewComponent} from '../components/map/map-view/map-view.component';
import {LoginComponent} from '../components/auth/login/login.component';
import {RegisterComponent} from '../components/auth/register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LeafletModule, MapViewComponent, LoginComponent, RegisterComponent, MatFormFieldModule, MatInputModule],
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
