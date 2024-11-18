import { Component, EventEmitter, Output } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { AuthService } from '../../../../services/auth/auth.service';
import { LoginModel } from '../../LoginModel';

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
    MatButton,
  ],
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  @Output() showSignUp = new EventEmitter<void>();
  @Output() authenticate = new EventEmitter<void>();
  errorMessage: string = '';

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  showLoginForm() {
    this.showSignUp.emit();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const cred: LoginModel = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };

      this.auth.login(cred)
      this.closeAuthDialogs()

    }
  }

  closeAuthDialogs() {
    this.authenticate.emit();
  }
}
