import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { StorageService } from 'src/app/Service/storage.service';
import { User } from 'src/app/Classes/user';
import { Profils } from 'src/app/profile';

@Component({
  selector: 'app-dashboard-validateur1',
  templateUrl: './dashboard-validateur1.component.html',
  styleUrls: ['./dashboard-validateur1.component.css']
})
export class DashboardValidateur1Component implements OnInit {
  users: User[] = [];
  user: User | null = null;  // Remarque ici pour le type User ou null
  selectedUser: User | undefined;
  searchKeyword: string = '';
  searchResults: User[] = [];
  userForm: FormGroup;
  formulaire: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) { }

  selectedProfile: Profils = Profils.adminDeleguee;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [ Validators.required,Validators.minLength(8) ]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      cnrps: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      grade: ['', [Validators.required]],
      fonction: ['', [Validators.required]],
    });

    this.getListeValidateurs1();

    // Retrieve the authenticated user from local storage
    this.user = this.storageService.getUser();
  }

  private getListeValidateurs1(): void {
    this.userService.getListeValidateurs1().subscribe(data => {
      this.users = data;
    });
  }

  detailUser(idUser: number): void {
    this.router.navigate(['/detailUser', idUser]);
  }

  listDemandeEnCours() {
    this.router.navigate(['/demandeEnCours']);
  }
logout(){
  this.storageService.clean();
  console.log("user déconnecté avec succés")

}
  modifierUser(idUser: number): void {
    this.router.navigate(['/modifierUser', idUser]);
  }
}
