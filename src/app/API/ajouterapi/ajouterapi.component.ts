import { StorageService } from 'src/app/Service/storage.service';
import { Structure } from 'src/app/Classes/structure';
import { StructureService } from 'src/app/Service/structure.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from 'src/app/Classes/api';
import { ApiService } from 'src/app/Service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouterapi',
  templateUrl: './ajouterapi.component.html',
  styleUrls: ['./ajouterapi.component.css']
})
export class AjouterapiComponent {
  apiForm:FormGroup;
  structures: Structure[] = [];
  structure : Structure;
  formulaire : Boolean = false;
  id : any;
  structureId : number;
  constructor(private apiService:ApiService,private storageService : StorageService,private structureService : StructureService, private fb:FormBuilder, private router:Router) { }
  // Structure:any={
  //   id :0,
  //   email:'',
  //   nomFr:'',
  //   telStr:"",
  //   code : "",
  //   adresse:"",
  //   type:""

  // };
  private getStructure(): void {
    this.structureService.getListeStructures().subscribe(
      data => {
        console.log("Data received: ", data);
        this.structures = data;
        console.log(this.structures);
      },
      error => {
        console.error('Error fetching structures', error);
      }
    );
  }

  onAjouter() {
    if (this.apiForm.valid) {
      const apiData = this.apiForm.value;
      console.log("api data", apiData);
      console.log("api forumlaire", this.apiForm.value);
      this.structureId = apiData.structure;
      console.log("structureId",this.structureId);
      this.apiService.addApi(this.structureId, apiData).subscribe(
        () => {
          console.log('API ajouté avec succès:', apiData);
          Swal.fire({
            icon: 'success',
            title: 'Succès !',
            color: "green",
            text: 'Api ajouté avec succès',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/listApi']);
            }
          });
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'API', error);
          console.log("Data received: ", apiData);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            color: "red",
            text: 'Une erreur s\'est produite lors de l\'ajout de l\'API. Veuillez réessayer.',
            confirmButtonText: 'OK',
          });
        }
      );
    } else {
      console.error('Structure sélectionnée non trouvée');
    }
  }

  ngOnInit(): void {
    this.apiForm = this.fb.group({
      nom: ['', [Validators.required,  Validators.minLength(3)]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      input : ['', [Validators.required]],
      output: ['', [Validators.required]],
      cadreUtilisation: ['', [Validators.required, Validators.minLength(10)]],
      url : ['', [Validators.required]],
      mode: ['', [Validators.required, Validators.pattern('^(prod|preprod)$')]],
      impact: ['', [Validators.required]],
      methode: ['', [Validators.required, Validators.pattern('^(get|post)$')]],
      structure : ['']
    });
    this.getStructure();
    // const id:any=this.router.snapshot.paramMap.get('id');
    // this.structureService.getById(id).subscribe(structure=> {
    //   this.structure=structure;
    // });
  }


}
