import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Allergy } from './allergy';

@Injectable({
  providedIn: 'root'
})
export class AllergyService {

  constructor(private http: HttpClient) { }

  allergies: Allergy[] = []

  private BASE_URL: string = 'http://localhost:3000';
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      console.log('error at allergy service ', error);

      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  // postAllergy (allergy: Allergy): Observable<Allergy> {
  //   return this.http.post<Allergy>(`${this.BASE_URL}/allergy`, JSON.stringify(allergy), this.httpOptions)
  //   .pipe(
  //     catchError(this.handleError('getUrlFromCloudinary', {}))
  //   )
  // }

  // addToAllergies (allergy: Allergy):void {
  //   this.allergies = [this.allergies, ...allergy]
  // }
}
