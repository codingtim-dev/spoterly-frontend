import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import Spot from '../../features/map/models/Spot';
import CreateSpotModel from '../../features/map/models/CreateSpotModel';
import {AuthService} from '../auth/auth.service';
import currBounds from '../../features/map/models/currBounds';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  private baseURl = environment.apiBaseUrl + "/api/spots";

  constructor(private http: HttpClient, private auth: AuthService) {
    console.log('SpotService constructor', this.baseURl);
  }

  public addSpot(spot: CreateSpotModel): Observable<{ success: boolean; message: string }> {

    const username = this.auth.getUsername()
    console.log(username)

    return this.http.post<any>(`${this.baseURl}/${username}/createSpot`, spot).pipe(
      map((res) => {
        if (res) {
          return {success: true, message: 'Spot created successfully.'};
        }

        return {success: false, message: 'An unexpected error occurred! Please try again!'};
      }),
      catchError((err) => {

        let errMessage = 'Spot could not been created! Please try again!';


        return of({success: false, message: errMessage});
      })
    );
  }

  public getSpots(params: currBounds | null): Observable<Spot[]> {

    if (params) {
      return this.http.get<Spot[]>(`${this.baseURl}?minLatitude=${params.minLatitude}&maxLatitude=${params.maxLatitude}&minLongitude=${params.minLongitude}&maxLongitude=${params.maxLongitude}`).pipe(
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
