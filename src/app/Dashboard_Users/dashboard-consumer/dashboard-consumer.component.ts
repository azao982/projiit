import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { StorageService } from 'src/app/Service/storage.service';
import { UserService } from 'src/app/Service/user.service';
import { Profils } from 'src/app/profile';

@Component({
  selector: 'app-dashboard-consumer',
  templateUrl: './dashboard-consumer.component.html',
  styleUrls: ['./dashboard-consumer.component.css']
})
export class DashboardConsumerComponent implements OnInit{
  user: User | null = null;  // Remarque ici pour le type User ou null
  selectedUser: User | undefined;
  searchKeyword: string = '';
  searchResults: User[] = [];
  userForm: FormGroup;
  formulaire: boolean = false;

constructor(private userService : UserService,  private storageService : StorageService ,private fb: FormBuilder, private router : Router ,private route : ActivatedRoute){}
// get all users
ngOnInit(): void {
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
    this.getConsommateur();
}


// get liste des users
private getConsommateur():void{
  this.user = this.storageService.getUser();
}
//detail user
detailUser(idUser : number) : void {
  this.router.navigate(['/detailUser' ,idUser]);

}

listDemandeEnCours(){
  this.router.navigate(['/listDemEnCoursCons']);
}

logout(){
  this.storageService.clean();
  console.log("user déconnecté avec succés")
}

listDemandeRefuses(){
  this.router.navigate(['/listDemRefuseeCons']);

}

listDemandeArectifier(){
  this.router.navigate(['/listDemARectifierCons']);

}

listDemandeTermines(){
  this.router.navigate(['/listDemTermineeCons']);
}

//modifier user
modifierUser(idUser : number) : void {
  this.router.navigate(['/modifierUser' ,idUser]);
}
detail(idUser : number) : void{
  this.router.navigate(['/detailUser', idUser]);
}

}
