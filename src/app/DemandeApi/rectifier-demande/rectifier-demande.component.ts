import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService } from 'src/app/Service/demande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rectifier-demande',
  templateUrl: './rectifier-demande.component.html',
  styleUrls: ['./rectifier-demande.component.css']
})
export class RectifierDemandeComponent {
// constucteur pour
constructor(private demandeService: DemandeService, private activatedRoute: ActivatedRoute,private router:Router) {}
ngOnInit(): void {
  const idDemande : any = this.activatedRoute.snapshot.paramMap.get('idDemande');
  this.demandeService.getById(idDemande).subscribe(demande => {
    this.demande = demande;
    this.demande.datecreation = new Date(demande.datecreation).toISOString().split('T')[0];
    // date systeme prend la date systeme par défaut
    this.demande.datemodification = new Date().toISOString().split('T')[0];

    this.demande.dateinvmasse = new Date(demande.dateinvmasse).toISOString().split('T')[0];
  });
}

//appel de la classe demande
demande: any = {
  description:"",
  reference: "",
  hebergeurapp :"",
  publie:"",
  nomapp: "",
  nomdomaineapp:"",
  adresseipapp: "",
  typeconnexion: "",
  nombreappelan: "",
  nombreappelmin: "",
  invomasse: "",
  payshebergeur:"",
  dateinvmasse: "",
  raisoninmMasse: "",
  datecreation: "",
  datemodification :"",
  statut:'',
  commentaire : ''

};

modifierDemande() {
  // Afficher une boîte de dialogue de confirmation avec SweetAlert2
  Swal.fire({
    icon: 'question',
    title: 'Voulez-vous vraiment confirmer la réctification de votre demande ?',
    confirmButtonText: 'Oui',
    cancelButtonText: 'Non',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  }).then((result) => {
    // Vérifier si l'utilisateur a cliqué sur le bouton "Oui"
    if (result.isConfirmed) {
      console.log('Form Data:', this.demande);
      this.demandeService.updateDemande(this.demande, this.demande.idDemande).subscribe(() => {
        // Alert success avec une icône
        Swal.fire({
          icon: 'success',
          title: 'Demande rectifiée!',
          text: 'La Demande a été rectifiée avec succès!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/listDemandeCons']);
        });
      }, error => {
        // Alert erreur avec une icône
        Swal.fire({
          icon: 'error',
          title: 'Erreur!',
          text: 'Une erreur s\'est produite lors de la rectification de la Demande.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      });
    }
  });
}

}
