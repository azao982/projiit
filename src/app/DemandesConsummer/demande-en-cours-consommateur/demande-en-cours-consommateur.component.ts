import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeApi } from 'src/app/Classes/demandeApi';
import { DemandeService } from 'src/app/Service/demande.service';
import { Status } from 'src/app/status';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-en-cours-consommateur',
  templateUrl: './demande-en-cours-consommateur.component.html',
  styleUrls: ['./demande-en-cours-consommateur.component.css']
})
export class DemandeEnCoursConsommateurComponent{

   lightYellowColors = [
    '#FFFFF0', // Ivory

];

avatars: string[] = [
  'https://bootdey.com/img/Content/avatar/avatar1.png',
  'https://bootdey.com/img/Content/avatar/avatar2.png',
  'https://bootdey.com/img/Content/avatar/avatar3.png',
  'https://bootdey.com/img/Content/avatar/avatar4.png',
  'https://bootdey.com/img/Content/avatar/avatar5.png',
  'https://bootdey.com/img/Content/avatar/avatar6.png',
  'https://bootdey.com/img/Content/avatar/avatar7.png',
  'https://bootdey.com/img/Content/avatar/avatar8.png',
  // Ajoutez autant d'URLs d'avatar que nécessaire
];
  demandes: DemandeApi[] = [];
  searchKeyword: string = '';
  searchResults: DemandeApi[] = [];
  Demande:DemandeApi;
  selectedDemande:  DemandeApi | undefined;
  demandeForm : FormGroup;
  formulaire : boolean=false;
  formData: DemandeApi = {
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
    invomasse : false ,
    payshebergeur : '',
    datecreation : new Date(),
    datemodification : new Date(),
    dateinvmasse : new Date(),
    raisoninmasse : '',
    statut : Status.en_cours_1ere_validation

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
      raisoninmasse :[''],
      statut:['enCoursConsommateur']
    });
    this.getDemandes();
  }


// get liste des demandes
  private getDemandes(): void{
    this.demandesService.getListeDemandesEncoursCons().subscribe(data => {
        this.demandes=data;
    });
  }
//lette de couleurs
getColor(index: number): string {
  return this.lightYellowColors[index % this.lightYellowColors.length];
}
// diriger vers page modifier
validerDemande(idDemande:number){
  this.router.navigate(['/validerDemande',idDemande]);
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
    this.demandesService.searchDemandeEnCours(this.searchKeyword).subscribe(
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
    this.router.navigate(['/detailDemande' ,idDemande]);
  }

}
