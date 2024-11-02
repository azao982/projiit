import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Structure } from '../Classes/structure';

@Injectable({
  providedIn: 'root'
})
export class StructureService {
  private structureUrl = 'http://localhost:9092/structures';

  constructor(private http: HttpClient) { }

  addStructure(str: Structure): Observable<any> {
    return this.http.post<any>(`${this.structureUrl}/ajouterStructure`, str)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Une erreur s\'est produite:', error);
    return throwError('Une erreur s\'est produite. Veuillez réessayer.');
  }

  getListeStructures(): Observable<Structure[]> {
    return this.http.get<Structure[]>(`${this.structureUrl}/consulterStructures`)
      .pipe(catchError(this.handleError));
  }



  searchStructure(keyword: string): Observable<Structure[]> {
    return this.http.get<Structure[]>(`${this.structureUrl}/rechercherStructure?keyword=${keyword}`);
  }

  supprimerStructure(id: number): Observable<void> {
    return this.http.delete<void>(`${this.structureUrl}/supprimerStructure/${id}`)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Structure> {
    return this.http.get<Structure>(`${this.structureUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateStructure(str: Structure, id: number): Observable<void> {
    return this.http.put<void>(`${this.structureUrl}/modifierStructure/${id}`, str)
      .pipe(catchError(this.handleError));
  }

  filtrerStructure(type: string): Observable<Structure[]> {
    const params = new HttpParams().set('type', type);
    return this.http.get<Structure[]>(`${this.structureUrl}/filtrerStructure`, { params })
      .pipe(catchError(this.handleError));
  }
}
