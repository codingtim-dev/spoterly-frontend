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

  onCloseClick(spot?: any) {

    spot ? this.dialogRef.close(spot) : this.dialogRef.close();
  }

  uploadForm: FormGroup;

  constructor(private spotService: SpotService, private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      longitude: ['', [Validators.required, Validators.min(0)]],
      latitude: ['', [Validators.required, Validators.min(0)]],
      city: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(){
    if(this.uploadForm.valid){

      const spot: CreateSpotModel = {
        name: this.uploadForm.get('name')?.value ? this.uploadForm.get('name')?.value : '',
        description: this.uploadForm.get('description')?.value ? this.uploadForm.get('description')?.value : '',
        latitude: this.uploadForm.get('latitude')?.value ? this.uploadForm.get('latitude')?.value : 0,
        longitude: this.uploadForm.get('longitude')?.value ? this.uploadForm.get('longitude')?.value : 0,
        city: this.uploadForm.get('city')?.value ? this.uploadForm.get('city')?.value : '',
      };

      this.onCloseClick(spot);
      this.spotService.addSpot(spot).subscribe(value =>
      console.log(value));

      this.dialogRef.close();

    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
