import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DemandeService } from '../../Service/demande.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detaildemande-admin',
  templateUrl: './detaildemande-admin.component.html',
  styleUrls: ['./detaildemande-admin.component.css']
})
export class DetaildemandeAdminComponent   implements OnInit {
    @Output() statutChanged: EventEmitter<string> = new EventEmitter<string>();

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
  // supprimer demande
  supprimerDemande(idDemande: number): void {
    if (idDemande === undefined || idDemande === null) {
      alert("i d Demande indéfini");
      return;
    }

    // Afficher une boîte de dialogue de confirmation
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette demande ?',
      text: 'Cette action est irréversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("id demande à supprimer : ", idDemande);
        // Appel de la méthode pour supprimer la demande
        this.demandeService.supprimerDemande(idDemande).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Succès!',
              text: 'La demande a été supprimée avec succès.',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this.Router.navigate(['/listDemande']);
              }
            });
          },
          error => {
            console.error('Échec de la suppression demande :', error);
            Swal.fire({
              icon: 'error',
              title: 'Erreur!',
              text: 'Échec de la suppression de la demande. Veuillez réessayer.',
              confirmButtonColor: '#d33',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }
  envoyermail(){
    this.Router.navigate(['/envoyerMail'])
  }
    // modifier demande
    modifierDemande(idDemande:number):void{
      this.Router.navigate(['/modifierDemande' ,idDemande]);
      }
      closeModal(): void {
        this.isCardOpen = false;
        window.history.back();  // Fermer le card en mettant la variable à false
      }
      onStatutChange(newStatut: string): void {
        this.demande.statut = newStatut;
        // Émettre un événement pour informer le composant parent de la modification du statut
        this.statutChanged.emit(newStatut);
      }
    }

