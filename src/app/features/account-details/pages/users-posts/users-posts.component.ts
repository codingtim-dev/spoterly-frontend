import {Component} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {forkJoin, map, Observable, of, switchMap} from 'rxjs';
import PostModel from '../../../../core/post/PostModel';
import {AuthService} from '../../../../services/auth/auth.service';
import {AccountService} from '../../../../services/account/account.service';
import {ImageService} from '../../../../services/post/image.service';
import {PostService} from '../../../../services/post/post.service';
import {ToastrService} from 'ngx-toastr';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-users-posts',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardImage,
    MatIcon,
    MatProgressSpinner,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './users-posts.component.html',
  styleUrl: './users-posts.component.scss'
})
export class UsersPostsComponent {
  username: string = "";
  usersPosts$?: Observable<PostModel[]>;

  constructor(private toastr: ToastrService, private auth: AuthService, private postService: PostService, private accountService: AccountService, private imageService: ImageService) {
  }

  ngOnInit() {
    this.username = this.auth.getUsername();

    // fetch liked posts
    this.usersPosts$ = this.postService.getPostByUsername(this.username);
    this.getImageUrlFromPost()
  }

  reloadUsersPosts() {

    this.usersPosts$ = this.accountService.getLikedPosts(this.username);
    this.getImageUrlFromPost();
  }

  onDelete(id: string) {


    this.postService.deletePost(id, this.username).subscribe((response) => {
      if (response.success) {
        this.toastr.success(response.message)
        this.reloadUsersPosts()

      } else {
        this.toastr.error(response.message)
      }
    });
  }

  getImageUrlFromPost(): void {
    this.usersPosts$ = this.usersPosts$?.pipe(
      map(posts => posts || []),
      switchMap(posts =>
        posts.length > 0

          ? forkJoin(
            posts.map(post =>
              this.imageService.getImageUrl(post.image_id).pipe(
                map(imageUrl => ({
                  ...post,
                  imageUrl,
                }))
              )
            )
          ) : of([])
      )
    );
  }
}
