import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import Spot from '../../features/map/models/Spot';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {SpotServiceService} from '../../services/spot/spot-service.service';

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

  constructor(private spotService: SpotServiceService, private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      longitude: ['', [Validators.required, Validators.min(0)]],
      latitude: ['', [Validators.required, Validators.min(0)]],
      city: ['', [Validators.required]],
    });
  }

  onSubmit(){
    if(this.uploadForm.valid){

      const spot: Spot = {
        name: this.uploadForm.get('title')?.value ? this.uploadForm.get('title')?.value : '',
        description: this.uploadForm.get('description')?.value ? this.uploadForm.get('description')?.value : '',
        latitude: this.uploadForm.get('latitude')?.value ? this.uploadForm.get('latitude')?.value : 0,
        longitude: this.uploadForm.get('longitude')?.value ? this.uploadForm.get('longitude')?.value : 0,
        city: this.uploadForm.get('city')?.value ? this.uploadForm.get('city')?.value : '',
      };

      console.log(spot);
      this.spotService.addSpot(spot).subscribe()

    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
