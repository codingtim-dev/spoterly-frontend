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
import {SpotService} from '../../services/spot/spot.service';
import CreateSpotModel from '../../features/map/models/CreateSpotModel';
import {MatError} from '@angular/material/form-field';
import {NgForOf, NgIf} from '@angular/common';
import {validationSpots} from './validation/validation-spots';

@Component({
  selector: 'app-add-spot-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatError,
    NgForOf,
    NgIf
  ],
  templateUrl: './add-spot-dialog.component.html',
  styleUrl: './add-spot-dialog.component.scss'
})
export class AddSpotDialogComponent {

  readonly dialogRef = inject(MatDialogRef<AddSpotDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  onCloseClick(spot?: any) {

    spot ? this.dialogRef.close(spot) : this.dialogRef.close();
  }

  uploadForm: FormGroup;

  constructor(private spotService: SpotService, private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      name: ['', {validators: [Validators.required, Validators.minLength(5), Validators.maxLength(20)], updateOn: 'blur'}],
      description: ['', {validators: [Validators.required, Validators.minLength(5), Validators.maxLength(255)], updateOn: 'blur'}],
      longitude: ['', {validators: [Validators.required, Validators.min(0)], updateOn: 'blur'}],
      latitude: ['', {validators: [Validators.required, Validators.min(0)], updateOn: 'blur'}],
    });
  }

  onSubmit(){
    if(this.uploadForm.valid){

      const spot: CreateSpotModel = {
        name: this.uploadForm.get('name')?.value ? this.uploadForm.get('name')?.value : '',
        description: this.uploadForm.get('description')?.value ? this.uploadForm.get('description')?.value : '',
        latitude: this.uploadForm.get('latitude')?.value ? this.uploadForm.get('latitude')?.value : 0,
        longitude: this.uploadForm.get('longitude')?.value ? this.uploadForm.get('longitude')?.value : 0,
      };

      this.onCloseClick(spot);
      this.spotService.addSpot(spot).subscribe(value =>
      console.log(value));

      this.dialogRef.close();

    } else {
      alert('Please fill out the form correctly.');
    }
  }

  protected readonly validationSpots = validationSpots;
}
