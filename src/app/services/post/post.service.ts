import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import Post from '../../features/map/models/Post';
import {AuthService} from '../auth/auth.service';
import PostModel from '../../core/post/PostModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  private baseUrl: string = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl).pipe(
      catchError((err) => {
        console.log('Error fetching data:', err);
        throw err
      })
    );
  }

  public createPost(post: Post): Observable<Post> {

    const username = this.auth.getUsername()


    return this.http.post<Post>(`${this.baseUrl}/${username}/createPost`, post).pipe(
      catchError((err) => {
        console.log('Error fetching data:', err);
        throw err
      })
    );
  }

  public getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`).pipe(
      catchError((err) => {
        console.log('Error fetching data:', err);
        throw err
      })
    );
  }

  public getPostsBySpotId(id: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${this.baseUrl}/spot/${id}`).pipe(
      catchError((err) => {
        console.log("Error fetching posts by spot id", err);
        throw err
      })
    )
  }
}
