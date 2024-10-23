import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel
} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';
import {InputComponent} from '../../../../components/input/input.component';
import {control} from 'leaflet';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardContent,
    MatCardHeader,
    MatCard,
    MatDivider,
    MatButton
  ],
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  @Output() showSignUp = new EventEmitter<boolean>();
  @Output() authenticate = new EventEmitter<boolean>();


  showSignUpForm(value: boolean) {
    this.showSignUp.emit(value);
  }


  onSubmit() {
    console.warn(this.form.value);  }
}
