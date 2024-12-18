import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatError} from '@angular/material/form-field';
import {AuthService} from '../../../../services/auth/auth.service';
import RegisterModel from '../../RegisterModel';
import {NgForOf, NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatButton,
    MatCardHeader,
    MatCardContent,
    MatError,
    NgIf,
    NgForOf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  @Output() registerVis = new EventEmitter<void>();
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
    ],
    'name': [
      {type: 'pattern', message: '*First name is required'},
      {type: 'minlength', message: '*Please enter your name'},
    ]
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      username: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(25)],
        updateOn: 'blur'
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
        updateOn: 'blur'
      }),
      firstname: new FormControl('', {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
        updateOn: 'blur'
      }),
      lastname: new FormControl('', {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
        updateOn: 'blur'
      }),
    });

  }

  showLoginForm() {
    this.registerVis.emit();
  }

  closeAuthDialogs() {
    this.authenticate.emit();
  }

  onSubmit() {
    // send register data to backend for signing in
    if (this.registerForm.valid) {
      const cred: RegisterModel = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
      };

      this.authService.register(cred).subscribe((response) => {
        if (response.token) {


          this.toastr.success(response.message);
          this.authService.storeToken(response.token);
          this.closeAuthDialogs()
          this.router.navigate(['/home']);
        } else {
          this.toastr.error(response.message);
        }
      });
    }
  }
}
