import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {NgClass, NgIf} from '@angular/common';
import {MatMenu, MatMenuItem} from '@angular/material/menu';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {AccountDetailsDialogComponent} from '../../components/account-details-dialog/account-details-dialog.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIcon,
    MatMenu,
    MatMenuItem,
    RouterLink,
    MatButton,
    NgIf,
    NgClass,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Output() authenticate = new EventEmitter<void>();
  username: string = "";
  navBarClass = "navbar"
  uuidRegex = /\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
  fill = "#000000"

  readonly dialog: MatDialog = inject(MatDialog);

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        if (this.uuidRegex.test(event.urlAfterRedirects)) {
          this.navBarClass = 'darkNavBar';
        } else {
          this.navBarClass = 'navbar';
        }

      }
    });
  }

  openAccountDetailsDialog(): void {
    const dialogRef = this.dialog.open(AccountDetailsDialogComponent, {
      height: '800px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
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
