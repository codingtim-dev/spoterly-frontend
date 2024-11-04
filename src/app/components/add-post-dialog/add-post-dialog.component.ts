import {Component, ElementRef, ViewChild} from '@angular/core';
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
import {ProgressUploadComponent} from '../progress-upload/progress-upload.component';
import {AsyncPipe, NgIf, NgStyle} from '@angular/common';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {mockSpotList} from '../../features/map/models/mockSpotList';
import {map, Observable, startWith} from 'rxjs';
import Spot from '../../features/map/models/Spot';

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
    ProgressUploadComponent,
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
export class AddPostDialogComponent {

  readonly dialogRef = inject(MatDialogRef<AddPostDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  isUploading = false;
  fileUrl!: string | null;
  uploadFile!: File | null;
  allowedFileTypes = ALLOWED_FILE_TYPES;


  onCloseClick() {
    this.dialogRef.close();
  }

  uploadForm: FormGroup;

  displaySpotList(options: Spot[]): (id: number) => string {
    return (id:number) => {
      const correspondingOption = Array.isArray(options) ? options.find(value => value.id === id) : null;
      return correspondingOption ? correspondingOption.title : '';
    }
  }

  constructor(private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      selectedSpot: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      file: [null, [Validators.required]],
    });
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

  handleUploadFile() {
    // logic to upload file
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      const formData = new FormData();
      formData.append('title', this.uploadForm.get('title')?.value);
      formData.append('description', this.uploadForm.get('description')?.value);
      formData.append('file', this.uploadForm.get('file')?.value);

      // Send form data to the backend
      console.log('Form submitted', formData);
    } else {
      alert('Please fill out the form correctly.');
    }
  }


  protected readonly mockSpotList = mockSpotList;
}
