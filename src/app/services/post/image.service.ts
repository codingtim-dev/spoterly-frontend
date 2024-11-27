import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = 'http://localhost:8080/api/images';
  private cache: { [imageId: string]: any } = {};

  constructor(private http: HttpClient) {
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // Add the file with the key "file"

    return this.http.post(this.baseUrl, formData).pipe(
      catchError((err) => {
        console.log('Error uploading data:', err);
        throw err
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
