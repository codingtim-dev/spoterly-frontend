import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../../core/auth/LoginModel';
import RegisterModel from '../../core/auth/RegisterModel';
import {jwtDecode} from 'jwt-decode';
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {catchError, map, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

interface AuthResponse {
  authenticated: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated = false;
  private baseUrl = environment.apiBaseUrl + "/api/auth";

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
  }

  login(cred: LoginModel): Observable<{ success: boolean; message: string }> {
    return this.http.post<any>(`${this.baseUrl}/login`, cred).pipe(
      map((res) => {
        const token = res.token;
        this.storeToken(token);

        if (!this.isTokenExpired(token)) {
          return {success: true, message: "User is logged in successfully"};
        } else {
          return {success: false, message: "User cannot be logged in (token expired)"};
        }
      }),
      catchError((err) => {
        let errorMessage = "An unexpected error occurred.";
        if (err.status === 404) {
          errorMessage = "Wrong username or password.";
        }
        return of({success: false, message: errorMessage});
      })
    );
  }


  register(cred: RegisterModel): Observable<{ success: boolean; message: string }> {
    return this.http.post<any>(`${this.baseUrl}/register`, cred).pipe(
      map((res) => {
        console.log(res)
        return {success: true, message: "User registered successfully."};

      }),
      catchError((err) => {
        let errMessage = "An unexpected error occurred! Please try again!"

        if (err.status === 404) {
          let errMessage = "User could not be registered. Please try again!"
        }
        return of({success: false, message: errMessage});
      })
    );
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

    this.toastr.info("Logged out successfully.");
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
