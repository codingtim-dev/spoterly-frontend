import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatIconButton } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonToggleGroup,
    MatIconButton,
    NgOptimizedImage,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}
