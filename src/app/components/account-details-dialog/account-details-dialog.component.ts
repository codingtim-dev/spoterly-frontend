import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountService} from '../../services/account/account.service';
import {MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {AuthService} from '../../services/auth/auth.service';
import {AsyncPipe, KeyValuePipe, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {forkJoin, map, Observable, switchMap} from 'rxjs';
import PostModel from '../../core/post/PostModel';
import {ImageService} from '../../services/post/image.service';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {Router} from '@angular/router';

interface userData {
  username: string;
  firstname: string;
  lastname: string;
}

@Component({
  selector: 'account-details-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    NgForOf,
    KeyValuePipe,
    AsyncPipe,
    MatCard,
    MatCardContent,
    MatCardImage,
    NgIf,
    SlicePipe
  ],
  templateUrl: './account-details-dialog.component.html',
  styleUrl: './account-details-dialog.component.scss'
})
export class AccountDetailsDialogComponent implements OnInit {

  likedPosts$?: Observable<PostModel[]>;

  username?: string | null;
  accountDetails: userData = {
    username: '',
    firstname: "",
    lastname: ""
  };


  protected readonly close = close;

  constructor(private router: Router, private accountService: AccountService, private imageService: ImageService, private authService: AuthService, private dialogRef: MatDialogRef<AccountDetailsDialogComponent>,) {
  }

  onNavigate() {
    this.router.navigate(['/likedPosts']);
    this.dialogRef.close();
  }

  ngOnInit() {
    this.username = this.authService.getUsername();

    this.getUserData();

    this.likedPosts$ = this.accountService.getLikedPosts(this.username);

    this.getImageUrlFromPost()
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

  getUserData() {
    if (this.username != null) {

      this.accountService.getUser(this.username).subscribe((res) => {

          this.accountDetails.username = res.username;
          res.firstname == null ? this.accountDetails.firstname = "No first name exists" : this.accountDetails.firstname = res.firstname;
          res.lastname == null ? this.accountDetails.lastname = "No lastname name exists" : this.accountDetails.lastname = res.lastname;

        }
      )
    }
  }
}
