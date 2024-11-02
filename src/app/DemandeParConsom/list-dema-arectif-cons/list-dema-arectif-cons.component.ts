import { StorageService } from 'src/app/Service/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeApi } from 'src/app/Classes/demandeApi';
import { DemandeService } from 'src/app/Service/demande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-dema-arectif-cons',
  templateUrl: './list-dema-arectif-cons.component.html',
  styleUrls: ['./list-dema-arectif-cons.component.css']
})
export class ListDemaARectifConsComponent implements OnInit {
  colors: string[] = [
    '#ADD8E6', // Bleu clair
    '#87CEEB', // Bleu clair
    '#B0E0E6', // Bleu très clair
    '#AFEEEE', // Bleu clair
    '#87CEFA', // Bleu clair
    '#00BFFF', // Bleu clair
    '#1E90FF', // Bleu clair
    '#6495ED', // Bleu clair
    '#4682B4', // Bleu clair
    '#87CEFA', // Bleu clair
    '#00BFFF', // Bleu clair
    '#87CEFA', // Bleu clair
    '#B0E0E6', // Bleu très clair
    '#4682B4', // Bleu clair
  ];



avatars: string[] = [
  'https://bootdey.com/img/Content/avatar/avatar7.png',

  'https://bootdey.com/img/Content/avatar/avatar2.png',
  'https://bootdey.com/img/Content/avatar/avatar3.png',
  'https://bootdey.com/img/Content/avatar/avatar6.png',

  'https://bootdey.com/img/Content/avatar/avatar4.png',
  'https://bootdey.com/img/Content/avatar/avatar5.png',
  'https://bootdey.com/img/Content/avatar/avatar8.png',
  'https://bootdey.com/img/Content/avatar/avatar1.png',


  // Ajoutez autant d'URLs d'avatar que nécessaire
];

  demandes: DemandeApi[] = [];
  searchKeyword: string = '';
  searchResults: DemandeApi[] = [];
  Demande:DemandeApi;
  selectedDemande:  DemandeApi | undefined;
  demandeForm : FormGroup;
  formulaire : boolean=false;
  idUser : number;
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
    statut:''

  };

  constructor(private demandesService: DemandeService, private storageService: StorageService ,private fb : FormBuilder,private router: Router, private route : ActivatedRoute) {}
  ngOnInit(): void {
    this.idUser= this.storageService.getUser().idUser;
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
      statut:['']
    });
    this.getDemandes();
  }
// get liste des demandes
private getDemandes(): void {
  this.demandesService.getListeDemandesByUser(this.idUser).subscribe(
    data => {
      // Filtrer les demandes pour n'inclure que celles avec le statut 'à_rectifier'
      this.demandes = data.filter(demande => demande.statut === 'à_rectifier');
      console.log("demandes à rectifier", this.demandes);
    },
    error => {
      console.error("Erreur lors de la récupération des demandes", error);
    }
  );
}


// palette de couleurs
getColor(index: number): string {
  return this.colors[index % this.colors.length];
}

  showErrorMessage(arg0: string) {
    throw new Error('Method not implemented.');
  }
//consulter detail demande
  DetailDemande(idDemande: number): void {
    this.router.navigate(['/detailDemande' ,idDemande]);
  }

  RectifierDemande(idDemande: number): void {
    this.router.navigate(['/rectifierDemande' ,idDemande]);
  }
}
