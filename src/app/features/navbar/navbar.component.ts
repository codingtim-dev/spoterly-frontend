import {Component, EventEmitter, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    NgOptimizedImage,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    RouterLink,
    MatButton,
    NgIf,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() authenticate = new EventEmitter<void>();
  username: string = "";

  constructor(private authService: AuthService) {
  }

  getUsername(): void {
    this.username = this.authService.getUsername() ? this.authService.getUsername()! : '';
  }

  showProfile() {

    if (this.authService.isAuthenticated()) {
      this.getUsername();
      return true
    }
    return false
  }

  toggleAuthForms() {
    this.authenticate.emit();
  }

  logout() {
    this.authService.logout();
  }

}
