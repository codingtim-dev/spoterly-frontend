import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
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
export class SpotDetailsComponent{

  @Input() spot: any;
  previewSize: number = 4;

  // fetch 4 posts with the current spot id
  postsImages: any;
}
