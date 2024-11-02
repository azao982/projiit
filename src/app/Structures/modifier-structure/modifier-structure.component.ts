import { Structure } from './../../Classes/structure';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StructureService } from 'src/app/Service/structure.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-structure',
  templateUrl: './modifier-structure.component.html',
  styleUrls: ['./modifier-structure.component.css']
})
export class ModifierStructureComponent {
  constructor(private structureService : StructureService,private ActivatedRoute: ActivatedRoute, private Router:Router) {}
    ngOnInit() : void{
      const id:any=this.ActivatedRoute.snapshot.paramMap.get('id');
      this.structureService.getById(id).subscribe(structure=> {
        this.Structure=structure;
      });
    }
    detailStructure(id: number): void {
      this.Router.navigate(['/detailStructure', id]);
    }
    Structure:any={
      id :0,
      email:'',
      nomFr:'',
      telStr:"",
      code : "",
      adresse:"",
      type:""

    };

  modifierStructure(): void {
    const id: any = this.ActivatedRoute.snapshot.paramMap.get('id');
    // Appeler le service pour modifier l'utilisateur
    this.structureService.updateStructure(this.Structure, id).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Succès !',
          color : 'blue' ,
          text: 'La structure a été modifié avec succès !',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.Router.navigate(['/listStructure']);
          }
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops !',
          color : 'red',
          text: 'Une erreur lors de la modification de structure. Merci de réessayer plus tard.',
          confirmButtonText: 'OK',
        });
        console.error('Erreur lors de la modification de structure : ', error);
      }
    );
  }
  retour() {
    this.Router.navigate(['/accueil']);
  }

}
