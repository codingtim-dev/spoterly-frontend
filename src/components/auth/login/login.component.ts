import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatCardHeader,
    MatCardContent,
    MatDivider
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);

  @Output() registerVis = new EventEmitter<boolean>();

  setRegisterVis(value: boolean) {
    this.registerVis.emit(value);
  }

  onsubmit() {
    // send login data to backend for logging in
    return;
  }
}
