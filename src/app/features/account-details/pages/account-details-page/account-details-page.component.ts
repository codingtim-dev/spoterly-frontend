import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {AccountService} from '../../../../services/account/account.service';
import UserModel from '../../../../services/account/Models/UserModel';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';

@Component({
  selector: 'app-account-details-page',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent
  ],
  templateUrl: './account-details-page.component.html',
  styleUrl: './account-details-page.component.scss'
})
export class AccountDetailsPageComponent implements OnInit {

  username?: string | null;
  accountDetails?: UserModel;

  constructor(private authService: AuthService, private accountService: AccountService) {
  }

  ;

  ngOnInit() {
    this.getUsername();

    this.getUserData();
  }

  getUsername() {
    this.username = this.authService.getUsername()

    if (this.username != null) {
      return this.username;
    }

    return ""
  }

  getUserData() {
    console.log(this.username)
    if (this.username != null) {

      this.accountService.getUser(this.username).subscribe((res) => {
          this.accountDetails = res;

          this.accountDetails.firstname == null ? this.accountDetails.firstname = "No first name exists" : this.accountDetails.firstname;
          this.accountDetails.lastname == null ? this.accountDetails.lastname = "No lastname name exists" : this.accountDetails.lastname;

          console.log(this.accountDetails)
        }
      )
    }
  }


}
