import { DemandeApi } from 'src/app/Classes/demandeApi';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService } from 'src/app/Service/demande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-demande',
  templateUrl: './details-demande.component.html',
  styleUrls: ['./details-demande.component.css']
})
export class DetailsDemandeComponent implements OnInit {
  @Input() selectedApi: any;
  isCardOpen: boolean = true;
  constructor(private demandeService : DemandeService ,private ActivatedRoute: ActivatedRoute, private Router:Router) {}
    ngOnInit() : void{
      const idDemande:any=this.ActivatedRoute.snapshot.paramMap.get('idDemande');
      this.getDemande(idDemande);
      if (!this.demande.statut) {
        this.demande.statut = ''; // Définissez ici la valeur par défaut souhaitée
    }
    }
   demande:any={
    idDemande :'',
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
    datecreation : '',
    datemodification : '',
    dateinvmasse : '',
    raisoninmasse : '',
    statut:'',
  }

    private getDemande(idDemande : number) : void{
      this.demandeService.getById(idDemande).subscribe(
       demande => {
          this.demande=demande;
          this.demande.datecreation = new Date(demande.datecreation).toISOString().split('T')[0];
          this.demande.datemodification = new Date(demande.datemodification).toISOString().split('T')[0];
          this.demande.dateinvmasse = new Date(demande.dateinvmasse).toISOString().split('T')[0];

      })
    }
    closeModal(): void {
      this.isCardOpen = false;
      window.history.back();  // Fermer le card en mettant la variable à false
    }
   }

