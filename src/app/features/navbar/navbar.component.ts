import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatIconButton} from '@angular/material/button';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonToggleGroup,
    MatIconButton,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
