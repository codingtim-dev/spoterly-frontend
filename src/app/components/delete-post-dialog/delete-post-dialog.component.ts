import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {PostService} from '../../services/post/post.service';
import {AuthService} from '../../services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-delete-post-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    ReactiveFormsModule
  ],
  templateUrl: './delete-post-dialog.component.html',
  styleUrl: './delete-post-dialog.component.scss'
})
export class DeletePostDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeletePostDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  constructor(private postService: PostService, private authService: AuthService, private toastr: ToastrService,) {
  }

  onDelete() {
    let username = this.authService.getUsername();


    this.postService.deletePost(this.data, username).subscribe((response) => {
      if (response.success) {
        this.toastr.success(response.message)
        this.dialogRef.close(true)
      } else {
        this.toastr.error(response.message)
        this.dialogRef.close(true)
      }
    });
  }

  onCloseClick() {
    this.dialogRef.close();
  }

}
