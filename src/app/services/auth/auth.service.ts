import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../../core/auth/LoginModel';
import RegisterModel from '../../core/auth/RegisterModel';
import {jwtDecode} from 'jwt-decode';
import {Router} from "@angular/router";

interface AuthResponse {
  authenticated: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated = false;
  private baseUrl: string = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(cred: LoginModel) {
    this.http.post<any>(`${this.baseUrl}/login`, cred).pipe().subscribe((res) => {
      if (res) {
        const token = res.token;
        this.storeToken(token);

        if (!this.isTokenExpired(token)) {
          window.alert("User successfully logged in");
        } else {
          window.alert("User cannot be logged in");
        }
      }
    })
  }

  register(cred: RegisterModel) {
    this.http.post(`${this.baseUrl}/register`, cred).subscribe((res) => {
      return res;
    });
  }

  storeToken(token: string) {
    sessionStorage.setItem("authToken", token)
  }

  isAuthenticated() {
    // check everytime before taking an action with authenticated user rights

    const token = sessionStorage.getItem("authToken")

    if (token && !this.isTokenExpired(token)) {
      this.authenticated = true
    }
    return this.authenticated;
  }


  logout(): void {
    sessionStorage.removeItem("authToken");

    this.authenticated = false;
    this.router.navigate(['/']);

  }

  getUsername(): string {
    const token = sessionStorage.getItem("authToken");

    if (!token) {
      return "null";
    }

    try {
      const decode = jwtDecode(token);
      return decode.sub || "null";
    } catch (error) {
      console.error("Error decoding the token: ", error);
      return "";
    }
  }


  isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    return (decoded.exp * 1000) < Date.now();
  }
}
