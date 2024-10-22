import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import Spot from '../../models/Spot';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-spot-details',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
  ],
  templateUrl: './spot-details.component.html',
  styleUrl: './spot-details.component.scss'
})
export class SpotDetailsComponent implements OnChanges{

  @Input() spot: any;
  isVisible = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['spot'].currentValue == null || changes['spot'].currentValue == undefined){
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }
  }
}
