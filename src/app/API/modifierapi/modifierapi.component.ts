import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifierapi',
  templateUrl: './modifierapi.component.html',
  styleUrls: ['./modifierapi.component.css']
})
export class ModifierapiComponent implements OnInit {
 constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute,private router:Router) {}
  ngOnInit(): void {
    const idApi : any = this.activatedRoute.snapshot.paramMap.get('idApi');
    this.apiService.getById(idApi).subscribe(api => {
      this.api = api;
    });
  }

 //appel de la classe api
 api: any = {
    idApi : 0,
    nom :'',
    code : '',
    description : '',
    input : '',
    output : '',
    cadreUtilisation : '',
    url : '',
    mode: '',
    methode : '',
    impact :''
 };

 modifierApi() {
  console.log('Form Data:', this.api);
  this.apiService.updateApi(this.api, this.api.idApi).subscribe(() => {
    Swal.fire({
      icon: 'success',
      title: 'API modifiée avec succès!',
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      this.router.navigate(['/listApi']);
    });
  }, error => {
    console.error('Erreur lors de la modification de l\'API :', error);
    Swal.fire({
      icon: 'error',
      color:'red',
      title: 'Erreur lors de la modification de l\'API',
      text: 'Une erreur est survenue. Veuillez réessayer.'
    });
  });
}

 formData(arg0: string, formData: any) {
   throw new Error('Method not implemented.');
 }
}
