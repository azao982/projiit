import { Component, OnInit } from '@angular/core';
import { User } from '../Classes/user';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-valida',
  templateUrl: './list-valida.component.html',
  styleUrls: ['./list-valida.component.css']
})
export class ListValidaComponent implements OnInit{
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
      profile : ['']
    });
   // this.profileOptions = Object.values(Profils);
    this.getValidateur();
  }
    // get liste des consommateurs
    private getValidateur():void{
      this.userService.getListeValidateurs().subscribe(data => {
        this.users=data;
      })
    }

  //modifier Consommateur
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
        console.error('ID Validateur non défini');
        return;
      }
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: 'Vous ne pourrez pas récupérer ce validateur !',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.supprimerUser(idUser).subscribe(
        () => {
          Swal.fire('Succès', 'Validateur supprimé avec succès', 'success');
          this.getValidateur();
        },
        error => {
          console.error('Échec suppression validateur ');
          Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression de validateur', 'error');
        }
      );
    }
  });
}


// ajouter Validateur
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
          text: 'Validateur ajouté avec succès',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/listValidateur']);
          }
        });
      },
      error => {
        console.error('Erreur lors de l ajout de validateur',  error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          color : "red",
          text: 'Une erreur s\'est produite lors de l\'ajout de validateur . Veuillez réessayer.',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}

    // rechercher validateur par grade ou fonction
    RechercherUser(): void {
      if (!this.searchKeyword) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Veuillez entrer le grade ou la fonction de validateur  à rechercher !',
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
          text: 'Aucun validateur trouvé.',
        });
      }
    },
    (error) => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de la recherche de Validateur.',
      });
    }
  );
}

    // filtrer Validateur
    filtrerUser(grade: string): void {
      if (grade) {
        this.userService.filtrerValidateurs(grade).subscribe(
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
