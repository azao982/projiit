import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { StorageService } from 'src/app/Service/storage.service';
import { UserService } from 'src/app/Service/user.service';
import { Profils } from 'src/app/profile';

@Component({
  selector: 'app-dashboard-admin-delegue',
  templateUrl: './dashboard-admin-delegue.component.html',
  styleUrls: ['./dashboard-admin-delegue.component.css']
})
export class DashboardAdminDelegueComponent {
  users: User[] = [];
  user: User | null = null;
  selectedUser: User | undefined;
  searchKeyword: string = '';
  searchResults: User[] = [];
  userForm: FormGroup;
  formulaire: boolean = false;

constructor(private userService : UserService, private fb: FormBuilder,private storageService : StorageService , private router : Router ,private route : ActivatedRoute

){}
// get all users
ngOnInit(): void {
      // this.selectedProfile=Profils.adminDeleguee;
      this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      cnrps: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      grade: ['', [Validators.required]],
      fonction: ['', [Validators.required]],

    });
    this.getListeAdminDeleguee();
}
// get liste des users
private getListeAdminDeleguee():void{
  this.user = this.storageService.getUser();

}
//detail user
detailUser(idUser : number) : void {
  this.router.navigate(['/detailUser' ,idUser]);

}
listApi(){
  this.router.navigate(['/listApi']);
}
//modifier user
modifierUser(idUser : number) : void {
  this.router.navigate(['/modifierUser' ,idUser]);
}
modifierProfil(idUser : number) : void {
  this.router.navigate(['/modifierProfil' ,idUser]);
}

logout(){
  this.storageService.clean();
  console.log("user déconnecté avec succés")
}
}


