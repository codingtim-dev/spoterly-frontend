import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import ImageDto from '../../components/add-post-dialog/models/ImageDto';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = 'http://localhost:8080/api/images';

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // Add the file with the key "file"

    return this.http.post(this.baseUrl, formData).pipe(
      catchError((err) => {console.log('Error uploading data:', err); throw  err})    );

  }
}
