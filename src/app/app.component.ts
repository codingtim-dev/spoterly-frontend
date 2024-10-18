import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from '../components/navbar/navbar.component';
import {LoginComponent} from '../components/auth/login/login.component';
import {RegisterComponent} from '../components/auth/register/register.component';
import {MatFormField, MatFormFieldModule, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput, MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginComponent, RegisterComponent, MatFormFieldModule, MatInputModule],
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
