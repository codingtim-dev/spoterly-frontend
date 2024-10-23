import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-progress-upload',
  standalone: true,
  imports: [],
  templateUrl: './progress-upload.component.html',
  styleUrl: './progress-upload.component.scss'
})
export class ProgressUploadComponent {
  @Input() progress = 0;
}
