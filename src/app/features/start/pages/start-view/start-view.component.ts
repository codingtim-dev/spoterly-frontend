import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';
import {MatButton} from '@angular/material/button';
import {LoginComponent} from '../../../../core/auth/pages/login/login.component';
import {RegisterComponent} from '../../../../core/auth/pages/register/register.component';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'start-view',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgIf,
    MatButton,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './start-view.component.html',
  styleUrl: './start-view.component.scss',
  animations: [
    trigger('logoAnimation', [
      transition(':enter', [
        style({transform: 'translateY(100%)', opacity: 0}),
        animate('1s ease-out', style({transform: 'translateY(0)', opacity: 1}))
      ])
    ]),
    trigger('contentFadeIn', [
      transition(':enter', [
        style({opacity: 0}),
        animate('0.8s 0.5s ease-in', style({opacity: 1}))
      ])
    ])
  ]
})
export class StartViewComponent implements OnInit {
  showAuthDialog = false;
  showLoginDialog: boolean = true;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

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
