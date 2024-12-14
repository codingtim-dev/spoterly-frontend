import {Component, EventEmitter, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {AuthService} from '../../../../services/auth/auth.service';
import {LoginModel} from '../../LoginModel';
import {MatError} from '@angular/material/form-field';
import {NgForOf, NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

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
    MatError,
    NgForOf,
    NgIf,
  ],
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  @Output() showSignUp = new EventEmitter<void>();
  @Output() authenticate = new EventEmitter<void>();
  account_validation_messages = {
    'username': [
      {type: 'required', message: '*Username is required'},
      {type: 'minlength', message: '*Username must be at least 5 characters long'},
      {type: 'maxlength', message: '*Username cannot be more than 25 characters long'},
      {type: 'pattern', message: '*Your username must contain only numbers and letters'},
      {type: 'validUsername', message: '*Your username has already been taken'}
    ],
    'password': [
      {type: 'required', message: '*Password is required'},
      {type: 'minlength', message: '*Password must be at least 8 characters long'},
      {type: 'pattern', message: '*Your password must contain at least one uppercase, one lowercase, and one number'}
    ]
  }

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.loginForm = this.fb.group({
      username: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(25)],
        updateOn: 'blur'
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
        updateOn: 'blur'
      }),
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

      this.auth.login(cred).subscribe((response) => {
        if (response.success) {
          this.toastr.success(response.message);
          // Navigate to the desired page or perform other actions
          this.closeAuthDialogs()
        } else {
          this.toastr.error(response.message);
        }
      });
    }
  }

  closeAuthDialogs() {
    this.authenticate.emit();
  }
}
