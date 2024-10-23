import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import Spot from '../../models/Spot';
import {NgIf} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'spot-details',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    MatDivider,
    MatButton,
    RouterLink,
    MatIcon
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
