import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {AccountService} from '../../../../services/account/account.service';
import UserModel from '../../../../services/account/Models/UserModel';

@Component({
  selector: 'app-account-details-page',
  standalone: true,
  imports: [],
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

          this.accountDetails.firstName == null ? this.accountDetails.firstName = "No first name exists" : this.accountDetails.firstName;
          this.accountDetails.lastName == null ? this.accountDetails.lastName = "No lastname name exists" : this.accountDetails.lastName;

          console.log(this.accountDetails)
        }
      )
    }
  }


}
