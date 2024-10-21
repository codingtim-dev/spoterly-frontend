import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import Spot from '../../models/Spot';

@Component({
  selector: 'app-spot-details',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './spot-details.component.html',
  styleUrl: './spot-details.component.scss'
})
export class SpotDetailsComponent implements OnChanges{

  @Input() spot: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['spot']) {
      console.log("Changed")
    }else {
      console.log("No spots found");
    }
  }
}
