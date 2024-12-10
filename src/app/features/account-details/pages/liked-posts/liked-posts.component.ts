import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../../services/account/account.service';
import {AuthService} from '../../../../services/auth/auth.service';
import PostModel from '../../../../core/post/PostModel';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import {ImageService} from '../../../../services/post/image.service';
import {PostService} from '../../../../services/post/post.service';
import {SpotService} from '../../../../services/spot/spot.service';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton} from '@angular/material/button';

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
    MatFabButton
  ],
  templateUrl: './liked-posts.component.html',
  styleUrl: './liked-posts.component.scss'
})
export class LikedPostsComponent implements OnInit {


  username?: string | null;
  likedPosts!: PostModel[];
  hoveredPost: any;

  constructor(private auth: AuthService, private accountService: AccountService, private imageService: ImageService, private postService: PostService, private spotService: SpotService,) {
  }

  ngOnInit() {
    this.username = this.auth.getUsername();

    if (this.username != null) {
      this.accountService.getLikedPosts(this.username).subscribe((res) => {
        this.likedPosts = res;

        this.getImageUrlFromPost();
      })
    }

  }

  reloadPosts() {
    if (this.username != null) {
      this.accountService.getLikedPosts(this.username).subscribe((res) => {
        this.likedPosts = res;

        this.getImageUrlFromPost();
      })
    }
  }

  unlikePost(id: string) {
    if (this.username != null) {
      this.accountService.unlikePost(this.username, id).subscribe((res) => {
        this.reloadPosts()
      })

    }
  }

  getImageUrlFromPost() {
    this.likedPosts.forEach((post) => {
      this.imageService.getImageUrl(post.image_id).subscribe((res) => {
        post.imageUrl = res;
      })
    })

  }
}
