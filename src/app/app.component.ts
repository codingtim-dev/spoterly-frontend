import {Component, OnInit} from '@angular/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {LoginComponent} from './core/auth/pages/login/login.component';
import {RegisterComponent} from './core/auth/pages/register/register.component';
import {NavbarComponent} from './features/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LeafletModule,
    MatFormFieldModule,
    MatInputModule,
    AngularSvgIconModule,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    RouterOutlet,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'spoterly-frontend';

  showAuthDialog: boolean = false;
  showLoginDialog: boolean = true;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/application-logo-icon.svg'),
    ).addSvgIcon(
      'circleArrow',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Arrow_circle.svg'),
    )
  }

  ngOnInit() {

    //this.showAuthDialog = !this.authService.isAuthenticated();

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
