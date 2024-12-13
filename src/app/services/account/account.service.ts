import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import UserModel from './Models/UserModel';
import {catchError, map, Observable} from 'rxjs';
import PostModel from '../../core/post/PostModel';
import Spot from '../../features/map/models/Spot';

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
    return this.http.post(`${this.baseURL}/${username}/likePost/${postId}`, postId, {responseType: 'text' as 'json'});
  }

  unlikePost(username: string, postId: string): Observable<void> {
    return this.http.post<void>(`${this.baseURL}/${username}/unlikePost/${postId}`, postId, {responseType: 'text' as 'json'});
  }

  likeSpot(username: string, spotId: string) {
    return this.http.post(`${this.baseURL}/${username}/likePost/${spotId}`, spotId, {responseType: 'text' as 'json'})
  }

  unlikeSpot(username: string, spotId: string): Observable<string> {
    return this.http.post<string>(`${this.baseURL}/${username}/unlikePost/${spotId}`, spotId, {responseType: 'text' as 'json'})
  }

  getLikedPostsIds(username: string): Observable<string[]> {
    return this.http.get<PostModel[]>(`${this.baseURL}/${username}/likedPosts`).pipe(
      map(posts => posts.map(post => post.id))
    )
  }

  getLikedPosts(username: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${this.baseURL}/${username}/likedPosts`)
  }


  getLikedSpots(username: string): Observable<Spot[]> {
    return this.http.get<Spot[]>(`${this.baseURL}/${username}/likedSpots`)
  }
}
