import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../../core/auth/LoginModel';

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
    this.http.post<any>(this.baseUrl, cred).subscribe((res) => {
      console.log(res);
      if (res) {
        sessionStorage.setItem('auth', res.authenticated);
        sessionStorage.setItem('user', JSON.stringify(res.user));
        this.authenticated = res.authenticated;
      }
    });
  }

  isAuthenticated() {
    return this.authenticated;
  }

  logout(): void {
    sessionStorage.clear();
  }
}
