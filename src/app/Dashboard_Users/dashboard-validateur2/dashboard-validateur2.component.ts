import { StorageService } from 'src/app/Service/storage.service';


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeApi } from 'src/app/Classes/demandeApi';
import { User } from 'src/app/Classes/user';
import { DemandeService } from 'src/app/Service/demande.service';
import { UserService } from 'src/app/Service/user.service';
import { Profils } from 'src/app/profile';
import { Status } from 'src/app/status';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-validateur2',
  templateUrl: './dashboard-validateur2.component.html',
  styleUrls: ['./dashboard-validateur2.component.css']
})
export class DashboardValidateur2Component {
  users: User[] = [];
  user: User | null = null;  // Remarque ici pour le type User ou null
  selectedUser: User | undefined;
  searchKeyword: string = '';
  searchResults: User[] = [];
  userForm: FormGroup;
  formulaire: boolean = false;

constructor(private userService : UserService, private storageService : StorageService ,private fb: FormBuilder, private router : Router ,private route : ActivatedRoute){}
// get all users
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
    this.getListeValidateurs2();
}
private getListeValidateurs2():void{
    this.user = this.storageService.getUser();


}
detailUser(idUser : number) : void {
  this.router.navigate(['/detailUser' ,idUser]);
}
listDemandeEnCours(){
  this.router.navigate(['/demandeEnCours1ereValid']);
}
//modifier user
modifierUser(idUser : number) : void {
  this.router.navigate(['/modifierUser' ,idUser]);
}
logout(){
  this.storageService.clean();
  console.log("user déconnecté avec succés")
}

}
