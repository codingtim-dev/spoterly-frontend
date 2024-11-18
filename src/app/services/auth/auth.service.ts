import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../../core/auth/LoginModel';
import RegisterModel from '../../core/auth/RegisterModel';

interface AuthResponse {
  authenticated: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated = false;
  private baseUrl: string = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) {}

  login(cred: LoginModel) {
    this.http.post<any>(this.baseUrl, cred).pipe().subscribe((res) => {
      console.log(res);
      if (res) {
        sessionStorage.setItem('auth', res.authenticated);
        sessionStorage.setItem('user', JSON.stringify(res.user));
        this.authenticated = res.authenticated;
      }
    })
  }

  register(cred: RegisterModel) {
    this.http.post(this.baseUrl, cred).subscribe((res) => {
      return res;
    });
  }

  isAuthenticated() {
    // check everytime before taking an action with authenticated user rights
    const auth = sessionStorage.getItem("auth")

    if (auth) {
      auth == "true" ? this.authenticated = true : this.authenticated = false;
    }
    return this.authenticated;
  }


  logout(): void {
    sessionStorage.clear();
  }
}
