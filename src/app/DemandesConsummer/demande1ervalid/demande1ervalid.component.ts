import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeApi } from 'src/app/Classes/demandeApi';
import { Status } from 'src/app/status';
import { DemandeService } from 'src/app/Service/demande.service';

@Component({
  selector: 'app-demande1ere-valid',
  templateUrl: './demande1ervalid.component.html',
  styleUrls: ['./demande1ervalid.component.css']
})
export class Demande1ervalidComponent {
  colors: string[] = [
    '#FADBD8', '#C5EAF9', '#D6DBDF', '#F7DC6F', '#F5B7B1',
    '#D5F5E3', '#F5A9BC', '#EEE0B1', '#AED6F1', '#F5B041',
    '#DFF0D8', '#F5B7B1', '#D6EAF8', '#F6DDCC', '#ABEBC6',
    '#C8E6C9', '#AED6F1', '#FAD7A0', '#D7BDE2', '#A2D9CE'
]
avatars: string[] = [
  'https://bootdey.com/img/Content/avatar/avatar1.png',

  'https://bootdey.com/img/Content/avatar/avatar6.png',
  'https://bootdey.com/img/Content/avatar/avatar7.png',
  'https://bootdey.com/img/Content/avatar/avatar8.png',
  'https://bootdey.com/img/Content/avatar/avatar2.png',
  'https://bootdey.com/img/Content/avatar/avatar3.png',
  'https://bootdey.com/img/Content/avatar/avatar4.png',
  'https://bootdey.com/img/Content/avatar/avatar5.png',

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
    invomasse : true ,
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
      raisoninmasse : [''],
      statut:['en_cours_1ere_validation']
    });
    this.getDemandes();
  }


// get liste des demandes
  private getDemandes(): void{
    this.demandesService.getListeDemandes1niv().subscribe(data => {
        this.demandes=data;
    });
  }

// palette de couleurs
getColor(index: number): string {
  return this.colors[index % this.colors.length];
}
// diriger vers page modifier
validerDemande(idDemande:number){
  this.router.navigate(['/validerDemande2',idDemande]);
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
    this.demandesService.searchDemandeValid1(this.searchKeyword).subscribe(
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
  showErrorMessage(arg0: string) {
    throw new Error('Method not implemented.');
  }
//consulter detail demande
  DetailDemande(idDemande: number): void {
    this.router.navigate(['/detailDemande' ,idDemande]);
  }
}
