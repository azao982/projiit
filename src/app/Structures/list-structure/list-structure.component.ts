import { AjouterStructureComponent } from './../ajouter-structure/ajouter-structure.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureService } from 'src/app/Service/structure.service';
import Swal from 'sweetalert2';
import { Structure } from './../../Classes/structure';

@Component({
  selector: 'app-list-structure',
  templateUrl: './list-structure.component.html',
  styleUrls: ['./list-structure.component.css']
})
export class ListStructureComponent implements OnInit {
  structures: Structure[] = [];
  structure : Structure;
  searchKeyword: string = '';
  searchResults: Structure[] = [];
  constructor(private structureService: StructureService, private router: Router) {}

  ngOnInit(): void {
    console.log("Component initialized");
    this.getStructure();
  }

  private getStructure(): void {
    this.structureService.getListeStructures().subscribe(
      data => {
        console.log("Data received: ", data);
        this.structures = data;
      },
      error => {
        console.error('Error fetching structures', error);
      }
    );
  }

  supprimerStructure(id: number): void {
    if (id === undefined || id === null) {
      console.error('ID STRUCTURE non défini');
      return;
    }

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer cette structure !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.structureService.supprimerStructure(id).subscribe(
          () => {
            Swal.fire('Succès', 'STRUCTURE supprimée avec succès', 'success');
            this.getStructure();
          },
          error => {
            console.error('Échec suppression structure', error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression de la structure', 'error');
          }
        );
      }
    });
  }

  modifierStructure(id: number): void {
    this.router.navigate(['/modifierStructure', id]);
  }

  RechercherStructure(): void {

    if (!this.searchKeyword) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Veuillez entrer une structure à rechercher !',
      });
      return;
    }

    this.structureService.searchStructure(this.searchKeyword).subscribe(
      (result: Structure[]) => {
        console.log(result);
        this.searchResults = result;
        if (result.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Information',
            color: 'blue',
            text: 'Aucune structure trouvée !',
          });
        }
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la recherche de la structure.',
        });
      }
    );
  }

  detailStructure(id: number): void {
    this.router.navigate(['/detailStructure', id]);
  }

  filtrerStructure(type: string): void {
    this.structureService.filtrerStructure(type).subscribe(
      (result: Structure[]) => {
        console.log('Filtered results: ', result);
        this.structures = result;
      },
      error => {
        console.error('Erreur lors du filtrage :', error);
        Swal.fire('Erreur', "erreur lors du filtrage", 'error');
      }
    );
  }
ajouterStructure(){
  this.router.navigate(['/ajouterStructure']);
}


}
