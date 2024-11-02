import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DemandeService } from 'src/app/Service/demande.service';
import { DemandeApi } from 'src/app/Classes/demandeApi';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from 'src/app/status';

@Component({
  selector: 'app-list-demandes',
  templateUrl: './list-demandes.component.html',
  styleUrls: ['./list-demandes.component.css']
})
export class ListDemandesComponent implements OnInit {
  colors: string[] = [
    '#FFE0B2', // Orange clair pastel
    '#FFCCBC',
    '#F8BBD0', // Rose pastel
    '#DCEDC8', // Vert clair pastel
    '#C5CAE9', // Indigo clair pastel
    '#B3E5FC', // Bleu clair pastel
    // Orange clair pastel
    '#F0F4C3', //
  ]
  avatars: string[] = [
    'https://bootdey.com/img/Content/avatar/avatar1.png',
    'https://bootdey.com/img/Content/avatar/avatar7.png',

    'https://bootdey.com/img/Content/avatar/avatar8.png',
    'https://bootdey.com/img/Content/avatar/avatar3.png',
    'https://bootdey.com/img/Content/avatar/avatar4.png',
    'https://bootdey.com/img/Content/avatar/avatar5.png',
    'https://bootdey.com/img/Content/avatar/avatar6.png',
    'https://bootdey.com/img/Content/avatar/avatar7.png',
    // Ajoutez autant d'URLs d'avatar que nécessaire
  ];

  demandes: DemandeApi[] = [];
  searchKeyword: string = '';
  searchResults: DemandeApi[] = [];
  Demande:DemandeApi;
  selectedDemande:  DemandeApi | undefined;
  demandeForm : FormGroup;
  formulaire : boolean=false;
  selectedStatut: Status | undefined;

  //statusOptions: string[] = Object.values(Status);

  formData: any = {
    idDemande:0,
    reference: '',
    description: '',
    nomapp: '',
    hebergeurapp: '',
    publie: false,
    nomdomaineapp: '',
    adresseipapp: '',
    typeconnexion: '',
    nombreappelan: 0,
    nombreappelmin : 0,
    invomasse : true ,
    payshebergeur : '',
    datecreation : new Date(),
    datemodification : new Date(),
    dateinvmasse : new Date(),
    raisoninmasse : '',
    statut :''
  };

  constructor(private demandesService: DemandeService, private fb : FormBuilder,private router: Router, private route : ActivatedRoute) {}
  ngOnInit(): void {
    this.demandeForm = this.fb.group({
      reference: [''],
      description: [''],
      nomapp: [''],
      hebergeurapp: [''],
      publie: [''],
      nomdomaineapp: [''],
      adresseipapp: [''],
      typeconnexion: [''],
      nombreappelan: [''],
      nombreappelmin : [''],
      invomasse : [''],
      payshebergeur : [''],
      datecreation : [''],
      datemodification : [''],
      dateinvmasse : [''],
      raisoninmasse : [''],
      statut:['']
    });
    this.getDemandes();
   // this.statusOptions = Object.values(Status);

  }
  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }
// get liste des demandes
  private getDemandes(): void{
    this.demandesService.getListeDemandes().subscribe(data => {
        this.demandes=data;
    });
  }

  // supprimer demande
  supprimerDemande(idDemande: number): void {
    if (idDemande === undefined || idDemande === null) {
      console.error('ID Demande non défini');
      return;
    }
// Définir une classe CSS personnalisée pour agrandir la taille de la police
const swalCustomClass = {
  confirmButton: 'btn btn-danger',
  cancelButton: 'btn btn-success',
  popup: 'swal2-popup-custom',
  title: 'swal2-title-custom',
  htmlContainer: 'swal2-html-container-custom'
};

// Appeler SweetAlert2 avec la classe CSS personnalisée
Swal.fire({
  title: 'Êtes-vous sûr?',
  text: 'Vous ne pourrez pas récupérer cette demande !',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Oui, supprimer!',
  cancelButtonText: 'Annuler',
  customClass: swalCustomClass
}).then((result) => {
  if (result.isConfirmed) {
    this.demandesService.supprimerDemande(idDemande).subscribe(
      () => {
        Swal.fire('Succès', 'demande supprimée avec succès', 'success');
        this.getDemandes();
      },
      error => {
        console.error('Échec suppression demande');
        Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression de la demande', 'error');
      }
    );
  }
});

  }

// ajouter demande
*
// diriger vers page modifier
  modifierDemande(idDemande:number){
  this.router.navigate(['/modifierDemande',idDemande]);
  }
  // rechercher demande
  searchDemande(): void {
    if (!this.searchKeyword) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        color : 'red',
        text: 'Veuillez entrer une demande à rechercher !',
      });
      return;
    }

    this.demandesService.searchDemande(this.searchKeyword).subscribe(
      (result: DemandeApi[]) => {
        console.log(result);
        this.searchResults = result;
        if (result.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Information',
            color : 'blue' ,
            text: 'Aucune demande trouvée.',
          });
        }
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          color:'pink',
          text: 'Une erreur produite lors de la recherche de demande',
        });
      }
    );
  }


//consulter detail demande
  DetailDemande(idDemande: number): void {
    this.router.navigate(['/detailDemandeAdmin' ,idDemande]);

  }

private showErrorMessage(message: string): void {
  Swal.fire('Erreur', message, 'error');
}


// filtrer demande
filtrerDemande(nomapp : string){

  this.demandesService.filtrerDemande(nomapp).subscribe(
    (result: DemandeApi[]) => {
      console.log('Résultats filtrés :', result);
      this.demandes=result;
      console.log(result);

    },
    error => {
      console.error('Erreur lors du filtrage :', error);
      this.showErrorMessage("erreur lors du filtrage");
    }
  );
}

}
