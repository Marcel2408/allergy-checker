import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Allergy } from './allergy';
import allergyGroups  from './allergy-groups';

@Injectable({
  providedIn: 'root',
})
export class AllergyService {
  constructor(private http: HttpClient) {}

  allergies: Allergy[] = [];
  allergyGroups = allergyGroups;
  isGroupClicked: string[] = [];
  allergiesChanged = new Subject<void>();

  private BASE_URL = 'http://localhost:3000';
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      console.log('error at allergy service ', error);

      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAllergiesFromDB(): Observable<Allergy[]> {
    return this.http
      .get<Allergy[]>(`${this.BASE_URL}/allergy`)
      .pipe(catchError(this.handleError('getAllergiesFromDB', [])));
  }

  postAllergy(allergy: Allergy): Observable<Allergy> {
    return this.http
      .post<any>(
        `${this.BASE_URL}/allergy`,
        JSON.stringify(allergy),
        this.httpOptions
      )
      .pipe(catchError(this.handleError('postAllergy', {})));
  }

  deleteAllergy(allergy: Allergy): Observable<{}> {
    const { id } = allergy;
    return this.http
      .delete(`${this.BASE_URL}/allergy/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError('deleteAllergy', {})));
  }

  addToAllergies(allergies: Allergy[]): void {
    this.allergies = [...this.allergies, ...allergies];
    this.allergiesChanged.next(); // emitting event to render allergies
  }

  filterAllergy(name: string): void {
    this.allergies = [...this.allergies.filter((allergy) => allergy.allergy !== name)];

    this.allergiesChanged.next(); // emitting event to render allergies
  }

  filterMany(allergies: string[]) {
    this.allergies = [...this.allergies.filter(allergy => !allergies.includes(allergy.allergy))];
    this.allergiesChanged.next(); // emitting event to render allergies
  }

  postAllergyGroup(group: string): Observable<Allergy[]> {
    this.handleCheckbox(group, true);
    const currentAllergyNames = this.allergies.map(allergy => allergy.allergy);
    const allergiesToPost: string[] = this.allergyGroups[group].filter(allergy => !currentAllergyNames.includes(allergy));

    return this.http
      .post<any>(
        `${this.BASE_URL}/allergies`,
        JSON.stringify(allergiesToPost),
        this.httpOptions
      )
      .pipe(catchError(this.handleError('postAllergyGroup', [])));
  }

  deleteAllergyGroup(group: string): void {
    this.handleCheckbox(group, false);
    const allergiesToDelete = this.allergies.filter(allergy => this.allergyGroups[group].includes(allergy.allergy));
    let allergiesDeleted = 0;
    allergiesToDelete.forEach(allergy => {
      this.deleteAllergy(allergy)
      .subscribe(() => {
        allergiesDeleted += 1;
        if (allergiesDeleted === allergiesToDelete.length) this.filterMany(this.allergyGroups[group]);
      });
    })
  }

  handleCheckbox(clickedGroup: string, action: boolean): void {
    if (action) this.isGroupClicked = [...this.isGroupClicked, clickedGroup];
    else this.isGroupClicked = [...this.isGroupClicked.filter(group => clickedGroup !== group)];
  }
}
