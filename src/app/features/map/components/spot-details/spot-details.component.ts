import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {AddSpotDialogComponent} from '../../../../components/add-spot-dialog/add-spot-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import Spot from '../../models/Spot';

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

  @Input() spot!: Spot;
  readonly dialog = inject(MatDialog);
  @Output() isOpen = new EventEmitter<boolean>();
  previewSize: number = 4;


  // fetch 4 posts with the current spot id
  postsImages: any;

  closeDetails(value: boolean) {
    this.isOpen.emit(value);
  }

  openCreatePostDialog() {
    const dialogRef = this.dialog.open(AddSpotDialogComponent, {
      data: "test",
      height: '620px',
      width: '520px',
      panelClass: 'custom-dialog-panel'
    });

    this.closeDetails(false);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed")
    })
  }
}
