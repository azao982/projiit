import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../Classes/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-admin-deleg',
  templateUrl: './list-admin-deleg.component.html',
  styleUrls: ['./list-admin-deleg.component.css']
})
export class ListAdminDelegComponent implements OnInit{
  users : User[]=[];
  user : User;
  selectedUser : User | undefined ;
  searchKeyword: string='';
  searchResults: User[] = [];
  userForm : FormGroup;
  formulaire : boolean=false;

formData: any = {
    idUser:0,
    nom: '',
    prenom: '',
    email: '',
    password: '',
    mobile: '',
    cin: '',
    grade: '',
    cnrps: '',
    fonction: '',
  };

constructor(private userService : UserService, private fb: FormBuilder, private router : Router ,private route : ActivatedRoute){}

// get all users
ngOnInit(): void {
      this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8),
                      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%&:-_+#/*?£&])[A-Za-z\d@$!%:-_+#/*?£&]{8,}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      cnrps: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      grade: ['', [Validators.required]],
      fonction: ['', [Validators.required]],
        profile :['']
    });

    this.getAdminDeleguee();
  }
    // get liste des admins deleguees
    private getAdminDeleguee():void{
      this.userService.getListeAdminDeleguee().subscribe(data => {
        this.users=data;
      })
    }

  //modifier Admin Deleguee
  modifierUser(idUser : number) : void {
    this.router.navigate(['/modifierUser' ,idUser]);
  }
  //consulter detail user
  detailUser(idUser : number) : void {
    this.router.navigate(['/detailUser' ,idUser]);
  }

  //supprimer user
    supprimerUser(idUser: number): void {
      if (idUser === undefined || idUser === null) {
        console.error('ID admin  non défini');
        return;
      }
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: 'Vous ne pourrez pas récupérer cet Admin delegué !',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.supprimerUser(idUser).subscribe(
        () => {
          Swal.fire('Succès', 'Admin delegué supprimé avec succès', 'success');
          this.getAdminDeleguee();
        },
        error => {
          console.error('Échec suppression consummer');
          Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression de consumer', 'error');
        }
      );
    }
  });
}

userColors: string[] = ['#FADBD8', '#D6EAF8', '#D5DBDB', '#FCF3CF', '#D1F2EB', '#FDEDEC'];
userIconColors: string[] = ['#9b59b6', '#3498db', '#34495e', '#2ecc71', '#e67e22', '#f1c40f'];
userContainerColors: string[] = ['#F5B7B1', '#AED6F1', '#ABB2B9', '#F9E79F', '#A9DFBF', '#FAD7A0'];

// ajouter user
onAjouter() {
  if (this.userForm.valid) {
    this.formData = this.userForm.value;
    this.userService.addUser(this.formData).subscribe(
      data => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Succès !',
          color : "green",
          text: 'Consommateur ajouté avec succès',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/listConsommateur']);
          }
        });
      },
      error => {
        console.error('Erreur lors de l ajout de consumer',  error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          color : "red",
          text: 'Une erreur s\'est produite lors de l\'ajout de consumer. Veuillez réessayer.',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}

    // rechercher user
    RechercherUser(): void {
      if (!this.searchKeyword) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Veuillez entrer un consommateur à rechercher !',
        });
        return;
      }

  this.userService.searchUser(this.searchKeyword).subscribe(
    (result: User[]) => {
      console.log(result);
      this.searchResults = result;
      if (result.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'Information',
          color : 'blue' ,
          text: 'Aucun consommateur trouvé.',
        });
      }
    },
    (error) => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de la recherche de consommateur.',
      });
    }
  );
}

    // filtrer user
    filtrerUser(grade: string): void {
      if (grade) {
        this.userService.filtrerConsommateur(grade).subscribe(
          (result: User[]) => {
            console.log('Résultats filtrés :', result);
            this.users = result;
          },
          error => {
            console.error('Erreur lors du filtrage :', error);
          }
        );
      } else {
        console.error('Grade non défini.');
      }
    }


}
