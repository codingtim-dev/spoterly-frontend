import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {MatButton, MatFabButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {AddSpotDialogComponent} from '../../../../components/add-spot-dialog/add-spot-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import Spot from '../../models/Spot';
import {AuthService} from '../../../../services/auth/auth.service';
import {PostService} from '../../../../services/post/post.service';
import PostModel from '../../../../core/post/PostModel';
import {forkJoin, map, Observable, switchMap} from 'rxjs';
import {ImageService} from '../../../../services/post/image.service';

@Component({
  selector: 'spot-details',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    MatDivider,
    MatButton,
    RouterLink,
    MatIcon,
    AsyncPipe,
    MatFabButton,
    NgForOf
  ],
  templateUrl: './spot-details.component.html',
  styleUrl: './spot-details.component.scss'
})
export class SpotDetailsComponent implements OnInit {

  @Input() spot!: Spot;
  readonly dialog = inject(MatDialog);
  @Output() isOpen = new EventEmitter<boolean>();
  previewSize: number = 4;
  // fetch 4 posts with the current spot id
  postsImages: any;
  posts$?: Observable<PostModel[]>;

  constructor(private authService: AuthService, private postService: PostService, private imageService: ImageService) {
  }

  ngOnInit() {

    this.posts$ = this.postService.getPostsBySpotId(this.spot.id);

    this.getImageUrlFromPost()
  }

  showActions() {
    return this.authService.authenticated
  }

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

  getImageUrlFromPost(): void {
    this.posts$ = this.posts$?.pipe(
      switchMap(posts =>
        forkJoin(
          posts.map(post =>
            this.imageService.getImageUrl(post.image_id).pipe(
              map(imageUrl => ({
                ...post,
                imageUrl,
              }))
            )
          )
        )
      )
    );
  }
}
