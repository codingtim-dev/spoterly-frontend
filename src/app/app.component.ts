import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './features/navbar/navbar.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapViewComponent } from './features/map/pages/map-view/map-view.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavbarComponent,
    LeafletModule,
    MapViewComponent,
    LoginComponent,
    RegisterComponent,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    AngularSvgIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'spoterly-frontend';
  showSignUp = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  showRegister(showSignUp: boolean) {
    this.showSignUp = showSignUp;
  }

  isAuthenticated() {
    if (sessionStorage.getItem('auth')) {
      return sessionStorage.getItem('auth');
    }
    return this.authService.isAuthenticated();
  }
}
