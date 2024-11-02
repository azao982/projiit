import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Structure } from 'src/app/Classes/structure';
import { StructureService } from 'src/app/Service/structure.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-structure',
  templateUrl: './ajouter-structure.component.html',
  styleUrls: ['./ajouter-structure.component.css']
})
export class AjouterStructureComponent implements OnInit {

  structureForm: FormGroup;
  formulaire: Boolean = false;
  constructor(private structureService: StructureService, private fb: FormBuilder, private Router : Router) {}
     ngOnInit(): void {
     this.structureForm = this.fb.group({
      code: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telStr: ['', Validators.required],
      adresse: ['', Validators.required],
      nomFr: ['', Validators.required],
      type: ['', Validators.required]
    });

  }
  confirmerAjout() {
    if (this.structureForm.valid) {
      // Si le formulaire est valide, envoyer la demande
      this.structureService.addStructure(this.structureForm.value).subscribe(
        data => {
          console.log(data);
          // Afficher une notification de succès
          Swal.fire({
            iconHtml: '<i class="fas fa-check-circle"></i>',
            title: 'Succès',
            text: 'La structure a été ajoutée avec succès',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              // Rediriger vers la liste des demandes
              this.Router.navigate(['/listStructure']);
            }
          });
        },
        error => {
          console.error('Erreur lors de l\'ajout de la structure:', error);
          // Afficher une notification d'erreur
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout de la structure. Veuillez réessayer.',
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


}
