import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';

export type InputTypes = 'text' | 'textarea';

@Component({
  selector: 'app-input-component',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatInput
  ],
  templateUrl: './input-component.component.html',
  styleUrl: './input-component.component.scss'
})
export class InputComponentComponent {
  @Input() label = '';
  @Input() inputType: InputTypes = 'text';
  @Input() placeholder = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() dataTestId = '';
}
