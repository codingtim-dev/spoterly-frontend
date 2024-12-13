import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../../services/account/account.service';
import {AuthService} from '../../../../services/auth/auth.service';
import PostModel from '../../../../core/post/PostModel';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {ImageService} from '../../../../services/post/image.service';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton} from '@angular/material/button';
import {forkJoin, map, Observable, switchMap} from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-liked-posts',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardImage,
    NgForOf,
    NgIf,
    MatIcon,
    MatFabButton,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './liked-posts.component.html',
  styleUrl: './liked-posts.component.scss'
})
export class LikedPostsComponent implements OnInit {


  username: string = "";
  likedPosts$?: Observable<PostModel[]>;

  constructor(private auth: AuthService, private accountService: AccountService, private imageService: ImageService) {
  }

  ngOnInit() {
    this.username = this.auth.getUsername();

    // fetch liked posts
    this.likedPosts$ = this.accountService.getLikedPosts(this.username);
    this.getImageUrlFromPost()
  }

  reloadLikedPosts() {

    this.likedPosts$ = this.accountService.getLikedPosts(this.username);
    this.getImageUrlFromPost();
  }

  unlikePost(id: string) {
    this.accountService.unlikePost(this.username, id).subscribe((res) => {

      this.reloadLikedPosts()
    })
  }

  getImageUrlFromPost(): void {
    this.likedPosts$ = this.likedPosts$?.pipe(
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
