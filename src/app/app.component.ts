import {Component, OnInit} from '@angular/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {LoginComponent} from './core/auth/pages/login/login.component';
import {RegisterComponent} from './core/auth/pages/register/register.component';
import {NavbarComponent} from './features/navbar/navbar.component';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
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
    NgClass,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'spoterly-frontend';

  showAuthDialog: boolean = false;
  showLoginDialog: boolean = true;
  theme = "main-content"
  uuidRegex = /\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private router: Router) {

    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/application-logo-icon.svg'),
    ).addSvgIcon(
      'circleArrow',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Arrow_circle.svg'),
    )
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        if (this.uuidRegex.test(event.urlAfterRedirects)) {
          this.theme = 'main-container-dark';
        } else {
          this.theme = 'main-container';
        }

      }
    });
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
