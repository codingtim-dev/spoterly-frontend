import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './features/navbar/navbar.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LoginComponent} from './core/auth/pages/login/login.component';
import {RegisterComponent} from './core/auth/pages/register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {AuthService} from './services/auth/auth.service';
import {NgIf} from '@angular/common';
import {environment} from '../environments/environment';
import {RuntimeEnvironmentService} from './services/runtime-environment.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    LeafletModule,
    LoginComponent,
    RegisterComponent,
    MatFormFieldModule,
    MatInputModule,
    AngularSvgIconModule,
    NgIf,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'spoterly-frontend';
  backendUrl: string = environment.backendUrl; // Default from environment.ts


  showAuthDialog: boolean = false;
  showLoginDialog: boolean = true;

  constructor(private authService: AuthService, private runtimeEnvService: RuntimeEnvironmentService) {
  }

  ngOnInit() {
    const runtimeBackendUrl = this.runtimeEnvService.getConfigValue('backendUrl');
    if (runtimeBackendUrl) {
      this.backendUrl = runtimeBackendUrl;
    }
    console.log('Backend URL:', this.backendUrl);

    this.showAuthDialog = !this.authService.isAuthenticated();


  }

  closeAuthDialog() {
    this.showAuthDialog = false;
  }

  openAuthDialog() {
    this.showAuthDialog = true;
  }

  toggleAuthDialogs() {
    this.showLoginDialog = !this.showLoginDialog;
  }
}
