import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient';
import { Allergy } from './allergy';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  ingredients: Ingredient[] = [];
  ingredientsChanged = new Subject<void>();

  allergies: Allergy[] = [];

  private BASE_URL: string = 'http://localhost:3000';
  private CLOUDINARY_URL: string = 'https://api.cloudinary.com/v1_1/allergy-checker/image/upload';
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      console.log('error at pic service ', error);

      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

  getUrlFromCloudinary (dataUrl: string) {
    const picUrl = {
        'file': dataUrl,
        'upload_preset': 'solo-project-preset'
    }

    return this.http.post<any>(this.CLOUDINARY_URL, picUrl)
    .pipe(
      catchError(this.handleError('getUrlFromCloudinary', {}))
    )
  }

  getIngFromPic (url: {url: string}): Observable<Ingredient[]> {

    return this.http.post<Ingredient[]>(`${this.BASE_URL}/pic`, JSON.stringify(url), this.httpOptions)
    .pipe(
      catchError(this.handleError('getIngFromPic', []))
    )
  }


  // !ask how to avoid this step
  fillWithIng (ingredients: Ingredient[]):void {
    this.ingredients = [...ingredients];
    this.ingredientsChanged.next(); //emitting event to render ingredients
  }

}
