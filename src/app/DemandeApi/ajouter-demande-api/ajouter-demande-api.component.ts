import { StorageService } from 'src/app/Service/storage.service';

import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService } from 'src/app/Service/demande.service';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-ajouter-demande-api',
  templateUrl: './ajouter-demande-api.component.html',
  styleUrls: ['./ajouter-demande-api.component.css']
})
export class AjouterDemandeApiComponent implements OnInit {
  isAdding: boolean = true;
  @Input() selectedApi: any;
  idUser : number;
  demandeForm: FormGroup;
  formulaire: Boolean = false;

  constructor(
    private demandeService: DemandeService,
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private storageService : StorageService
  ) {}
  onAjouter() {
    if (this.demandeForm.valid) {
      this.demandeService.addDemande(this.idUser,this.demandeForm.value).subscribe(
        data => {
          console.log(data);
          Swal.fire({
            iconHtml: '<i class="fas fa-check-circle"></i>',
            title: 'Succès',
            text: 'La demande a été ajoutée avec succès',
            confirmButtonText: 'OK'
          });
        },
        error => {
          console.error('Erreur lors de l\'ajout de la demande:', error);
          // Afficher une notification d'erreur
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout de la demande. Veuillez réessayer.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      // Si le formulaire est invalide, afficher une notification d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Le formulaire n\'est pas valide',
        confirmButtonText: 'OK'
      });
    }
  }


  ngOnInit(): void {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().substr(0, 10);
    // affecter demande
    this.idUser = this.storageService.getUser().idUser;

    this.demandeForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(8)]],
      reference: ['', Validators.required],
      hebergeurapp: ['', Validators.required],
      publie: ['', Validators.required],
      nomapp: ['', Validators.required],
      nomdomaineapp: ['', Validators.required],
      adresseipapp: ['', [Validators.required, this.ipAddressValidator]],
      typeconnexion: ['', Validators.required],
      nombreappelan: ['', Validators.required],
      nombreappelmin: ['', Validators.required],
      invomasse: ['', Validators.required],
      payshebergeur: ['', Validators.required],
      dateinvmasse: ['', Validators.required],
      raisoninmasse: ['', Validators.required],
      datecreation: [formattedDate, [Validators.required]],
      statut: ["enCoursConsommateur",Validators.required]
    });

  }


  ipAddressValidator(control: FormControl): { [key: string]: any } | null {
    const ipAddressPattern: RegExp =
      /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;

    if (control.value && !ipAddressPattern.test(control.value)) {
      return { 'invalidIpAddress': true };
    }
    return null;
  }
  retourPagePrecedente() {
    this.router.navigate(['/listconsummer']);
  }

}

