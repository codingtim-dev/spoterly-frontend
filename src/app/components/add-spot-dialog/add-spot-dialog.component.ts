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
import {ToastrService} from 'ngx-toastr';

interface eventCoordinates {
  latitude: number;
  longitude: number;
}

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
  readonly data: eventCoordinates = inject(MAT_DIALOG_DATA);
  uploadForm: FormGroup;
  protected readonly validationSpots = validationSpots;

  constructor(private spotService: SpotService, private fb: FormBuilder, private toastr: ToastrService) {

    this.uploadForm = this.fb.group({
      name: ['', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(35)],
        updateOn: 'blur'
      }],
      description: ['', {
        validators: [Validators.maxLength(255)],
        updateOn: 'blur'
      }],
      longitude: [this.data.longitude, {validators: [Validators.required, Validators.min(0)], updateOn: 'blur'}],
      latitude: [this.data.latitude, {validators: [Validators.required, Validators.min(0)], updateOn: 'blur'}],
    });
  }

  onCloseClick(spot?: any) {

    spot ? this.dialogRef.close(spot) : this.dialogRef.close();
  }

  onSubmit() {
    if (this.uploadForm.valid) {

      const spot: CreateSpotModel = {
        name: this.uploadForm.get('name')?.value ? this.uploadForm.get('name')?.value : '',
        description: this.uploadForm.get('description')?.value ? this.uploadForm.get('description')?.value : '',
        latitude: this.uploadForm.get('latitude')?.value ? this.uploadForm.get('latitude')?.value : 0,
        longitude: this.uploadForm.get('longitude')?.value ? this.uploadForm.get('longitude')?.value : 0,
      };

      this.onCloseClick(spot);
      this.spotService.addSpot(spot).subscribe((result) => {
        if (result.success) {
          this.toastr.success(result.message);
          this.dialogRef.close();
        } else {
          this.toastr.error(result.message);
        }
      })


    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
