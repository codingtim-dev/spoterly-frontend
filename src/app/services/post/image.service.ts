import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import Image from '../../features/map/models/Image';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = environment.apiBaseUrl + "/api/images";
  private cache: { [imageId: string]: any } = {};

  constructor(private http: HttpClient) {
  }

  uploadImage(file: File): Observable<{ success: boolean; message: string, image: Image | null }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Image>(this.baseUrl, formData).pipe(
      map((response) => {
        if (response) {
          return {success: true, message: 'Image uploaded successfully.', image: response};
        }

        return {success: false, message: 'An unexpected error occurred! Please try again!', image: null};
      }),
      catchError((err) => {
        let errMessage = 'Image could not been uploaded! Please try again!';


        return of({success: false, message: errMessage, image: null});
      }));

  }

  getImageUrl(id: string) {

    if (this.cache[id]) {
      return of(this.cache[id]);
    }

    const url = `${this.baseUrl}/${id}`;

    return this.http.get(url, {responseType: 'blob'}).pipe(
      map(blob => {
        const imageUrl = URL.createObjectURL(blob);
        this.cache[id] = imageUrl;
        return imageUrl;
      }),
      catchError(() => "f")
    );
  }
}
