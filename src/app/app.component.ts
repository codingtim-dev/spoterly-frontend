import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from '../components/navbar/navbar.component';
import {LoginComponent} from '../components/auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spoterly-frontend';

  hasAccount = true;

  showRegister(register: boolean) {
    this.hasAccount = false;

    console.log(this.hasAccount);
  }
}
