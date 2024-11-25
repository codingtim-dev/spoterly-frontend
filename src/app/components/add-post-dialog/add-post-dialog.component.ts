import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {inject} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe, NgIf, NgStyle} from '@angular/common';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {mockSpotList} from '../../features/map/models/mockSpotList';
import Spot from '../../features/map/models/Spot';
import Post from '../../features/map/models/Post';
import {ImageService} from '../../services/post/image.service';
import {SpotService} from '../../services/spot/spot.service';
import {AuthService} from '../../services/auth/auth.service';
import {PostService} from '../../services/post/post.service';

const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
];


@Component({
  selector: 'app-add-post-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatInput,
    MatButton,
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgStyle,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    AsyncPipe
  ],
  templateUrl: './add-post-dialog.component.html',
  styleUrl: './add-post-dialog.component.scss'
})
export class AddPostDialogComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<AddPostDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  spotList: Spot[] = [];

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  isUploading = false;
  fileUrl!: string | null;
  uploadFile!: File | null;
  allowedFileTypes = ALLOWED_FILE_TYPES;


  onCloseClick() {
    this.dialogRef.close();
  }

  uploadForm: FormGroup;

  displaySpotList(options: Spot[]): (id: string) => string {
    return (id:string) => {
      const correspondingOption = Array.isArray(options) ? options.find(value => value.id === id) : null;
      return correspondingOption ? correspondingOption.name : '';
    }
  }

  constructor(private imageService: ImageService, private spotService: SpotService, private authService: AuthService, private postService: PostService, private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      selectedSpot: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      file: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.spotService.getSpots().subscribe({
      next: (spots) => {
        this.spotList = spots
      },
      error: (err) => {
        console.error("Failed to load spots: ", err);
      }
    })
  }

  handleChange(event: any) {
    const file = event.target.files[0] as File;
    this.fileUrl = URL.createObjectURL(file);
    this.uploadFile = file;
  }

  handleRemoveFile() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = null;
    }

    this.uploadFile = null;
    this.fileUrl = null;
  }


  onSubmit() {
    if (this.uploadForm.valid) {

      const author = this.authService.getUsername();

      const post: Post = {
        spot: this.uploadForm.get('selectedSpot')?.value,
        author: author ? author : "",
        title: this.uploadForm.get('title')?.value,
        content: this.uploadForm.get('description')?.value,

      }

      this.imageService.uploadImage(this.uploadForm.get('file')?.value).subscribe(response => {
        console.log(response);
      })

      // upload first the post then the image
      this.postService.createPost(post).subscribe(response => {
        console.log(response);
      })
    } else {
      alert('Please fill out the form correctly.');
    }
  }


  protected readonly mockSpotList = mockSpotList;
}
