import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-spot-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule
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
    });
  }

  onSubmit(){
    if(this.uploadForm.valid){
      const formData = new FormData();
      formData.append('title', this.data.title);
      formData.append('description', this.data.description);

      console.log(formData);
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
