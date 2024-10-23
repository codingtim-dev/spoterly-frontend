import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCard,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatCardHeader,
    MatCardContent,
    MatDivider,
    MatLabel
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),

  });

  @Output() registerVis = new EventEmitter<boolean>();
  @Output() authenticate = new EventEmitter<boolean>();

  showSignUpForm(value: boolean) {
    this.registerVis.emit(value);
  }

  onSubmit() {
    // send register data to backend for signing in
    console.warn(this.form.value);
  }
}
