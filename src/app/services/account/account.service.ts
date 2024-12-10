import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  private baseURL: string = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) {
  }

  likePost(username: string, postId: string) {
    this.http.post(`${this.baseURL}/${username}/likePost/${postId}`, postId).subscribe((res) => {
      return res;
    })
  }

  unlikePost(username: string, postId: string) {
    this.http.post(`${this.baseURL}/${username}/unlikePost/${postId}`, postId).subscribe((res) => {
      return res;
    })
  }

  likeSpot(username: string, spotId: string) {
    this.http.post(`${this.baseURL}/${username}/likePost/${spotId}`, spotId).subscribe((res) => {
      return res;
    })
  }

  unlikeSpot(username: string, spotId: string) {
    this.http.post(`${this.baseURL}/${username}/unlikePost/${spotId}`, spotId).subscribe((res) => {
      return res;
    })
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
