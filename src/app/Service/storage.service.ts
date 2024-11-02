import { Injectable } from '@angular/core';
import { Profils } from '../profile';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  getIdFromStorage(): number {
    const id = localStorage.getItem('id');
    return id ? parseInt(id, 10) : null;
  }

  setIdInStorage(id: number): void {
    localStorage.setItem('id', id.toString());
  }

  
  saveUser(user: {  email: string, password: string, idUser: number, profile: Profils, cnrps : string, fonction : string, mobile : string, grade : string, nom : string, prenom : string, cin : string}): void {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }


  getUser(): { email: string, password: string, idUser: number, profile: Profils, cnrps : string, fonction : string, mobile : string, grade : string, nom : string, prenom : string, cin : string} | null {
    const user = window.localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

 clean(): void {
    window.localStorage.removeItem(USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  isAdminLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.profile.includes('admin');
  }

  isAdminDelegLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.profile.includes('admin_delegue');
  }

  isConsommateurLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.profile.includes('validateur_1er_niveau');
  }

  isValid1LoggedIn(): boolean {
    const user = this.getUser();
    return user && user.profile.includes('validateur_2eme_niveau');
  }

  isValid2LoggedIn(): boolean {
    const user = this.getUser();
    return user && user.profile.includes('consommateur');
  }
}
