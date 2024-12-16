import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import Post from '../../features/map/models/Post';
import {AuthService} from '../auth/auth.service';
import PostModel from '../../core/post/PostModel';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  private baseUrl = environment.apiBaseUrl + "/api/posts";

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

  public createPost(post: Post): Observable<{ success: boolean; message: string }> {

    const username = this.auth.getUsername()


    return this.http.post<Post>(`${this.baseUrl}/${username}/createPost`, post).pipe(
      map((result) => {
        if (result) {
          return {success: true, message: 'Post created successfully.'};
        }

        return {success: false, message: 'An unexpected error occurred! Please try again!'};
      }),
      catchError((err) => {
        let errMessage = 'Spot could not been created! Please try again!';


        return of({success: false, message: errMessage});
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
