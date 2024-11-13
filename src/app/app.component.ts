import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'spoterly-frontend';
  showSignUp = false;
  showForm: boolean = true;

  constructor(private authService: AuthService) {}

  showRegister(showSignUp: boolean) {
    this.showSignUp = showSignUp;
  }

  isAuthenticated() {
    return this.authService.isAuthenticated().subscribe((res) => res);
  }
}
