import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {SpotService} from '../../../../services/spot/spot.service';
import Spot from '../../models/Spot';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-spot-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatIcon,
    MatButton
  ],
  templateUrl: './spot-card.component.html',
  styleUrl: './spot-card.component.scss'
})
export class SpotCardComponent {

  @Input() spot!: Spot;
  @Output() openDetails = new EventEmitter<Spot>();


  constructor(private spotService: SpotService) {
  }


  onOpenDetails(value: Spot) {
    return this.openDetails.emit(value);
  }
}
