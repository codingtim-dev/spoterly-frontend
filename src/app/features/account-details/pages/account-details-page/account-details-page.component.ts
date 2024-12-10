import {Component} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-account-details-page',
  standalone: true,
  imports: [],
  templateUrl: './account-details-page.component.html',
  styleUrl: './account-details-page.component.scss'
})
export class AccountDetailsPageComponent {

  username?: string | null;

  constructor(private authService: AuthService) {
  }

  ;


  getUsername(): string {
    this.username = this.authService.getUsername();

    if (this.username != null) {
      return this.username;
    }

    return "No username found";
  }

  
}
