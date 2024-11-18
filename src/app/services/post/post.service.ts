import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import Post from '../../features/map/models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  private baseUrl: string = 'http://localhost:8080/posts';
  constructor(private http: HttpClient) { }

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl).pipe(
      catchError((err) => {console.log('Error fetching data:', err); throw  err})
    );
  }

  public createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post).pipe(
      catchError((err) => {console.log('Error fetching data:', err); throw  err})
    );
  }

  public getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`).pipe(
      catchError((err) => {console.log('Error fetching data:', err); throw  err})
    );
  }
}
