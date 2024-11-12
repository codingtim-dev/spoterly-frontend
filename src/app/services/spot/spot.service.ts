import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import Spot from '../../features/map/models/Spot';
import CreateSpotModel from '../../features/map/models/CreateSpotModel';

@Injectable({
  providedIn: 'root'
})
export class SpotService {


  public baseURl = "http://localhost:8080/spots";


  constructor(private http: HttpClient) { }

  public addSpot(spot: CreateSpotModel): Observable<Spot> {
    return this.http.post<Spot>(this.baseURl, spot).pipe(
      catchError((err) => {console.log('Error fetching data:', err); throw  err})
    );
  }

  public getSpots(): Observable<Spot[]> {
    return this.http.get<Spot[]>(this.baseURl).pipe(
      catchError((err) => {console.log('Error fetching data:', err); throw  err})
    );
  }

  public getSpotById(id: string): Observable<Spot> {

    console.log(id)
    return this.http.get<Spot>(`${this.baseURl}/${id}`).pipe(
      catchError((err) => {console.log('Error fetching data:', err); throw  err})
    )
  }
}
