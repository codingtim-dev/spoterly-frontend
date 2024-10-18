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
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatCardContent,
    MatCardModule,
    MatCardHeader,
    MatDivider,
    MatButton,
    MatLabel,
    MatHint
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);

  @Output() showSignUp = new EventEmitter<boolean>();
  @Output() authenticate = new EventEmitter<boolean>();

  showSignUpForm(value: boolean) {
    this.showSignUp.emit(value);
  }

  onsubmit() {
    // send login data to backend for logging in
    this.authenticate.emit(true);
  }
}
