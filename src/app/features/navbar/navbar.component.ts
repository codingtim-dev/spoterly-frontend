import {Component, EventEmitter, Output} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgIf, NgOptimizedImage} from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIcon, MatButtonToggleGroup, MatIconButton, NgOptimizedImage, MatButton, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() authenticate = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  showProfile() {
    return this.authService.isAuthenticated();
  }

  toggleAuthForms() {
    this.authenticate.emit();
  }
}
