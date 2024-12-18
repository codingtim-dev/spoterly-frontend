import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import PostModel from '../../../../core/post/PostModel';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {SpotService} from '../../../../services/spot/spot.service';
import {PostService} from '../../../../services/post/post.service';
import {ImageService} from '../../../../services/post/image.service';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {AccountService} from '../../../../services/account/account.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {forkJoin, map, Observable, of, switchMap} from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

interface IPost {
  id: string;
  imageUrl: string;
}

@Component({
  selector: 'app-spot-view',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MatCard,
    NgForOf,
    MatCardContent,
    MatCardImage,
    MatIcon,
    AsyncPipe,
    MatButton,
    MatProgressSpinner
  ],
  templateUrl: './spot-view.component.html',
  styleUrl: './spot-view.component.scss'
})
export class SpotViewComponent implements OnDestroy, OnInit {

  id: string = "";
  spot: any;
  posts$?: Observable<PostModel[]>
  postIdsUserLiked$!: Observable<string[]>;
  private sub: any;

  constructor(private authService: AuthService, private accountService: AccountService, private imageService: ImageService, private postService: PostService, private spotService: SpotService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id')!;
    })


    this.spotService.getSpotById(this.id.toString()).subscribe(result => {
      this.spot = result;
    });

    this.posts$ = this.postService.getPostsBySpotId(this.id.toString())

    this.getImageUrlFromPost()

    const username = this.authService.getUsername();


    this.postIdsUserLiked$ = this.accountService.getLikedPostsIds(username);

  }

  getImageUrlFromPost(): void {
    this.posts$ = this.posts$?.pipe(
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

  showPosts() {
    return this.authService.isAuthenticated();
  }

  reloadLikedPosts() {
    const username = this.authService.getUsername();

    this.postIdsUserLiked$ = this.accountService.getLikedPostsIds(username);
  }

  getImageFromPost(id: string) {

    //return this.imageService.getImageUrl(id).subscribe()
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  likePost(id: string) {
    const username = this.authService.getUsername();
    this.accountService.likePost(username, id).subscribe((res) => {
      this.reloadLikedPosts()
    })
  }

  unlikePost(id: string) {
    const username = this.authService.getUsername();

    this.accountService.unlikePost(username, id).subscribe((res) => {

      this.reloadLikedPosts()
    })
  }
}
