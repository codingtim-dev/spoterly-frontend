import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../../core/auth/LoginModel';

interface AuthResponse {
  authenticated: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated = new BehaviorSubject<boolean>(false);
  private baseUrl: string = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) {}

  login(cred: LoginModel) {
    this.http.post<any>(this.baseUrl, cred).subscribe((res) => {
      console.log(res);
      if (res) {
        this.authenticated.next(res.authenticated);
        console.log(this.authenticated.getValue());
      }
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticated.asObservable();
  }

  logout(): void {
    this.authenticated.next(false);
  }
}
