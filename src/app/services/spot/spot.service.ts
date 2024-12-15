import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import Spot from '../../features/map/models/Spot';
import CreateSpotModel from '../../features/map/models/CreateSpotModel';
import {AuthService} from '../auth/auth.service';
import currBounds from '../../features/map/models/currBounds';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  public baseURl = "http://localhost:8080/api/spots";
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private auth: AuthService) {
    console.log('SpotService constructor', this.apiBaseUrl);
  }

  public addSpot(spot: CreateSpotModel): Observable<Spot> {

    const username = this.auth.getUsername()
    console.log(username)

    return this.http.post<any>(`${this.baseURl}/${username}/createSpot`, spot).pipe(
      catchError((err) => {
        console.log('Error fetching data:', err);
        throw err
      })
    );
  }

  public getSpots(params: currBounds | null): Observable<Spot[]> {

    if (params) {
      return this.http.get<Spot[]>(`${this.apiBaseUrl}?minLatitude=${params.minLatitude}&maxLatitude=${params.maxLatitude}&minLongitude=${params.minLongitude}&maxLongitude=${params.maxLongitude}`).pipe(
        catchError((err) => {
          console.log('Error fetching data:', err);
          throw err
        })
      );
    }
    return this.http.get<Spot[]>(this.baseURl).pipe(
      catchError((err) => {
        console.log('Error fetching data:', err);
        throw err
      })
    );
  }

  public getSpotById(id: string): Observable<Spot> {

    return this.http.get<Spot>(`${this.baseURl}/${id}`).pipe(
      catchError((err) => {
        console.log('Error fetching data:', err);
        throw err
      })
    )
  }
}
