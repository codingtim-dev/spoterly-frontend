import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import UserModel from './Models/UserModel';
import {catchError, Observable} from 'rxjs';

interface UserDto {
  username: string;
  firstName: string;
  lastName: string;
  role: any
}


@Injectable({
  providedIn: 'root'
})
export class AccountService {


  private baseURL: string = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) {
  }

  getUser(username: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseURL}/${username}`).pipe(
      catchError((err) => {
        console.log('Error fetching user data:', err);
        throw err
      })
    )
  }

  likePost(username: string, postId: string) {
    return this.http.post(`${this.baseURL}/${username}/likePost/${postId}`, postId);
  }

  unlikePost(username: string, postId: string) {
    return this.http.post(`${this.baseURL}/${username}/unlikePost/${postId}`, postId);
  }

  likeSpot(username: string, spotId: string) {
    return this.http.post(`${this.baseURL}/${username}/likePost/${spotId}`, spotId)
  }

  unlikeSpot(username: string, spotId: string) {
    return this.http.post(`${this.baseURL}/${username}/unlikePost/${spotId}`, spotId)
  }

  getLikedPosts(username: string) {
    this.http.get(`${this.baseURL}/${username}/likedPosts`).subscribe((res) => {
      return res;
    })
  }

  getLikedSpots(username: string) {
    this.http.get(`${this.baseURL}/${username}/likedSpots`).subscribe((res) => {
      return res;
    })
  }
}
