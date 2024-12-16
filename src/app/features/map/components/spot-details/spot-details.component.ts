import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {AsyncPipe, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import Spot from '../../models/Spot';
import {AuthService} from '../../../../services/auth/auth.service';
import {PostService} from '../../../../services/post/post.service';
import PostModel from '../../../../core/post/PostModel';
import {forkJoin, map, Observable, switchMap} from 'rxjs';
import {ImageService} from '../../../../services/post/image.service';
import {AddPostDialogComponent} from '../../../../components/add-post-dialog/add-post-dialog.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

interface selectedSpot {
  id: string;
  name: string;
}

@Component({
  selector: 'spot-details',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    MatButton,
    RouterLink,
    AsyncPipe,
    NgForOf,
    SlicePipe,
    MatProgressSpinner
  ],
  templateUrl: './spot-details.component.html',
  styleUrl: './spot-details.component.scss'
})
export class SpotDetailsComponent implements OnInit, OnChanges {

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

  ngOnChanges(changes: SimpleChanges) {

    this.posts$ = this.postService.getPostsBySpotId(this.spot.id);

    this.getImageUrlFromPost()

  }

  showPosts() {
    return this.authService.isAuthenticated();
  }

  closeDetails(value: boolean) {
    this.isOpen.emit(value);
  }

  openCreatePostDialog(selectedSpot: selectedSpot) {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      data: selectedSpot,
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
