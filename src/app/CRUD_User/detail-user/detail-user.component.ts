
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  constructor(private UserService : UserService,private ActivatedRoute: ActivatedRoute, private Router:Router) {}
    ngOnInit() : void{
      const idUser:any=this.ActivatedRoute.snapshot.paramMap.get('idUser');
      this.getUser(idUser);
    }
    onRetour(){
      this.Router.navigate(['/listUser'])
    }
    user:any={
      email:'',
      nom:'',
      prenom:'',
      cin:'',
      mobile:"",
      grade:'',
      fonction:"",
      cnrps:'',
      password:'',
      profile : '',
    }

    private getUser(idUser : number) : void{
      this.UserService.getById(idUser).subscribe(
        user => {
          this.user=user;
      })
    }
// supprimer user
supprimerUser(idUser: number): void {
  if (idUser === undefined || idUser === null) {
    alert("ID utilisateur indéfini");
    return;
  }

  // Boîte de dialogue de confirmation
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: 'Vous ne pourrez pas récupérer cet utilisateur!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      // Si l'utilisateur confirme la suppression, appeler la méthode de suppression
      console.log("id utilisateur à supprimer : ", idUser);
      this.UserService.supprimerUser(idUser).subscribe(
        () => {
          // Afficher une boîte de dialogue de succès
          Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'L\'utilisateur a été supprimé avec succès.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.Router.navigate(['/listUser']);
            }
          });
        },
        error => {
          // En cas d'erreur, afficher une boîte de dialogue d'erreur
          console.error('Échec de la suppression de l\'utilisateur :', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Échec de la suppression de l\'utilisateur. Veuillez réessayer.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  });
}

// envoyer mail user
mailingUser(idUser: number): void {
  this.Router.navigate(["/mailingUser" , idUser]);
}
//modifier user
modifierUser(idUser : number) : void {
  this.Router.navigate(['/modifierUser' ,idUser]);
}


  }
