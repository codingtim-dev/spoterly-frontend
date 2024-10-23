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
import {DndDirective} from '../../directives/dnd.directive';
import {ProgressUploadComponent} from '../progress-upload/progress-upload.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-spot-dialog',
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
    DndDirective,
    ProgressUploadComponent,
    NgIf
  ],
  templateUrl: './add-spot-dialog.component.html',
  styleUrl: './add-spot-dialog.component.scss'
})
export class AddSpotDialogComponent {

  readonly dialogRef = inject(MatDialogRef<AddSpotDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  onCloseClick() {
    this.dialogRef.close();
  }

  uploadForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      file: [null, [Validators.required]],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        this.uploadForm.patchValue({ file: file });
      } else {
        alert('Only .jpg and .png files are allowed.');
        this.uploadForm.patchValue({ file: null });
      }
    }
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


}
