import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatError} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {mockSpotList} from '../../features/map/models/mockSpotList';
import Spot from '../../features/map/models/Spot';
import {ImageService} from '../../services/post/image.service';
import {SpotService} from '../../services/spot/spot.service';
import {AuthService} from '../../services/auth/auth.service';
import {PostService} from '../../services/post/post.service';
import {validationSpots} from '../add-spot-dialog/validation/validation-spots';
import {validationPosts} from './validation/validation-posts';

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
    MatDialogActions,
    MatInput,
    MatButton,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgStyle,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    MatError,
    NgForOf
  ],
  templateUrl: './add-post-dialog.component.html',
  styleUrl: './add-post-dialog.component.scss'
})
export class AddPostDialogComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<AddPostDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  spotList: Spot[] = [];

  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;
  isUploading = false;
  fileUrl!: string | null;
  uploadFile!: File | null;
  allowedFileTypes = ALLOWED_FILE_TYPES;
  uploadForm: FormGroup;
  protected readonly mockSpotList = mockSpotList;
  protected readonly validationSpots = validationSpots;
  protected readonly validationPosts = validationPosts;

  constructor(private imageService: ImageService, private spotService: SpotService, private authService: AuthService, private postService: PostService, private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      selectedSpot: ['', [Validators.required]],
      title: ['', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(20)],
        updateOn: 'blur'
      }],
      description: ['', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(255)],
        updateOn: 'blur'
      }],
      file: [null, [Validators.required]],
    });
  }

  onCloseClick() {
    this.dialogRef.close();
  }

  displaySpotList(options: Spot[]): (id: string) => string {
    return (id: string) => {
      const correspondingOption = Array.isArray(options) ? options.find(value => value.id === id) : null;
      return correspondingOption ? correspondingOption.name : '';
    }
  }

  ngOnInit() {
    this.spotService.getSpots(null).subscribe({
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

      let imagedto: any;
      let post;
      this.imageService.uploadImage(this.uploadFile!).subscribe({
        next: value => {
          imagedto = value;
          console.log(imagedto);

          post = {
            spot_id: this.uploadForm.get('selectedSpot')?.value,
            image_id: imagedto.id,
            title: this.uploadForm.get('title')?.value,
            content: this.uploadForm.get('description')?.value,

          }

          this.postService.createPost(post).subscribe(response => {
            console.log(response);
          })
        }
      })

    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
