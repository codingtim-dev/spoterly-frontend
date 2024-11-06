import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import Spot from '../../features/map/models/Spot';

@Injectable({
  providedIn: 'root'
})
export class SpotServiceService {


  public baseURl = "http://localhost:8080/spots";


  constructor(private http: HttpClient) { }

  public addSpot(spot: Spot): Observable<Spot> {
    return this.http.post<Spot>(this.baseURl, spot);
  }
}
