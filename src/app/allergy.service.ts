import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Allergy } from './allergy';

@Injectable({
  providedIn: 'root'
})
export class AllergyService {

  constructor(private http: HttpClient) { }

  allergies: Allergy[] = [];
  allergiesChanged = new Subject<void>();


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

  getAllergiesFromDB (): Observable<Allergy[]> {
    return this.http.get<Allergy[]>(`${this.BASE_URL}/allergy`)
    .pipe(
      catchError(this.handleError('getAllergiesFromDB', []))
    )
  }


  postAllergy (allergy: Allergy): Observable<Allergy> {
    return this.http.post<any>(`${this.BASE_URL}/allergy`, JSON.stringify(allergy), this.httpOptions)
    .pipe(
      catchError(this.handleError('postAllergy', {}))
    )
  }

  addToAllergies (allergies: Allergy[]):void {
    this.allergies = [...this.allergies, ...allergies];
    this.allergiesChanged.next(); //emitting event to render allergies
  }
}
