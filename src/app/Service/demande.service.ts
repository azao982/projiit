import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DemandeApi } from '../Classes/demandeApi';
@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private demandeUrl = 'http://localhost:9092/demande';
  constructor(private http: HttpClient) { }

  //  add new Demande
addDemande( idUser : number,demande : DemandeApi): Observable<any> {
  return this.http.post<any>(`${this.demandeUrl}/ajouterDemApi?idUser=` +idUser, demande)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
  console.error('Une erreur s\'est produite:', error);
  return throwError('Une erreur s\'est produite. Veuillez réessayer.');
  }

//afficher liste des Demandes par user
getListeDemandesByUser(idUser : number):Observable<DemandeApi[]> {
  return this.http.get<DemandeApi[]>(`${this.demandeUrl}/consulterDemandeParUser?idUser=`+ idUser);
}

//afficher liste des Demandes
  getListeDemandes():Observable<DemandeApi[]> {
    return this.http.get<DemandeApi[]>(`${this.demandeUrl}/consulterDemandesApis`);
  }
  getListeDemandes1niv():Observable<DemandeApi[]> {
    return this.http.get<DemandeApi[]>(`${this.demandeUrl}/consulterlist1niv`);
  }
  getListeDemandesTermin():Observable<DemandeApi[]> {
    return this.http.get<DemandeApi[]>(`${this.demandeUrl}/consulterlistTermin`);
  }
  getListeDemandesEncoursCons():Observable<DemandeApi[]> {
    return this.http.get<DemandeApi[]>(`${this.demandeUrl}/consulterlistEncourscons`);
    }
    getListeDemandesRef():Observable<DemandeApi[]> {
      return this.http.get<DemandeApi[]>(`${this.demandeUrl}/consulterlistRef`);
      }
      getListeDemandesArect():Observable<DemandeApi[]> {
        return this.http.get<DemandeApi[]>(`${this.demandeUrl}/consulterlistArect`);
        }

  // rechercher Demande
  searchDemande(keyword: string): Observable<DemandeApi[]> {
    return this.http.get<DemandeApi[]>(`${this.demandeUrl}/rechercherDemande?keyword=${keyword}`);
  }

searchDemandeTerminee(keyword:string){
  return this.http.get<DemandeApi[]>(`${this.demandeUrl}/rechercherDemandeParStatutTer?keyword=${keyword}`);
}
searchDemandeRefusee(keyword:string){
  return this.http.get<DemandeApi[]>(`${this.demandeUrl}/rechercherDemandeParStatutRef?keyword=${keyword}`);
}
searchDemandeARectifier(keyword:string){
  return this.http.get<DemandeApi[]>(`${this.demandeUrl}/rechercherDemandeParStatutRect?keyword=${keyword}`);
}
searchDemandeValid1(keyword:string){
  return this.http.get<DemandeApi[]>(`${this.demandeUrl}/rechercherDemandeParStatutValid1?keyword=${keyword}`);
}


searchDemandeEnCours(keyword:string){
  return this.http.get<DemandeApi[]>(`${this.demandeUrl}/rechercherDemandeParStatutEnCours?keyword=${keyword}`);
}


// delete Demande
  supprimerDemande(idDemande: number): Observable<void> {
    return this.http.delete<void>(`${this.demandeUrl}/supprimerDemApi/${idDemande}`);
  }

// get Demande by id
  getById(idDemande: number): Observable<DemandeApi> {
    const url = `${this.demandeUrl}/${idDemande}`;
    return this.http.get<DemandeApi>(url);
  }

// get demande by reference
getByReference(reference: string): Observable<DemandeApi> {
  const url = `${this.demandeUrl}/demande/${reference}`;
  return this.http.get<DemandeApi>(url);
}
// get demande by adress ip
getByAdresseIpApp(adresseipapp : string): Observable<DemandeApi> {
  const url = `${this.demandeUrl}/demandeApi/${adresseipapp}`;
  return this.http.get<DemandeApi>(url);
}
  // modifier Demande
  updateDemande(demande: DemandeApi, idDemande: number): Observable<void> {
    const url = `${this.demandeUrl}/modifierDemApi/${idDemande}`;
    return this.http.put<void>(url, demande);
  }

  // filtrer demande
  filtrerDemande(nomapp: string): Observable<DemandeApi[]> {
    const params = new HttpParams().set('nomapp', nomapp);
    return this.http.get<DemandeApi[]>(`${this.demandeUrl}/filtrerDemande`, { params });
  }


}
