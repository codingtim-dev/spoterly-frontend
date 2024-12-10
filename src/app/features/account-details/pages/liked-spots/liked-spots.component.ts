import {Component} from '@angular/core';
import {AccountService} from '../../../../services/account/account.service';

@Component({
  selector: 'app-liked-spots',
  standalone: true,
  imports: [],
  templateUrl: './liked-spots.component.html',
  styleUrl: './liked-spots.component.scss'
})
export class LikedSpotsComponent {


  constructor(private accountService: AccountService) {
  }
}
