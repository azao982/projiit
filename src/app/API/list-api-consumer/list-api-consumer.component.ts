
import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import { Api } from 'src/app/Classes/api';

@Component({
  selector: 'app-list-api-consumer',
  templateUrl: './list-api-consumer.component.html',
  styleUrls: ['./list-api-consumer.component.css']
})
export class ListApiConsumerComponent implements OnInit {
  colors: string[] = [
    '#0dcaf0','#fd3550',  '#ffc107', '#F5B7B1',
    '#D5F5E3', '#F5A9BC', '#EEE0B1', '#AED6F1', '#F5B041',
    '#DFF0D8', '#F5B7B1', '#D6EAF8', '#F6DDCC', '#ABEBC6',
    '#C8E6C9', '#AED6F1', '#FAD7A0', '#D7BDE2', '#A2D9CE'
]
avatars: string[] = [
  'https://bootdey.com/img/Content/avatar/avatar1.png',
  'https://bootdey.com/img/Content/avatar/avatar2.png',
  'https://bootdey.com/img/Content/avatar/avatar3.png',
  'https://bootdey.com/img/Content/avatar/avatar4.png',
  'https://bootdey.com/img/Content/avatar/avatar5.png',
  'https://bootdey.com/img/Content/avatar/avatar6.png',
  'https://bootdey.com/img/Content/avatar/avatar7.png',
  'https://bootdey.com/img/Content/avatar/avatar8.png',
  // Ajoutez autant d'URLs d'avatar que nécessaire
];
  apis: Api[] = [];
  searchKeyword: string = '';
  searchResults: Api[] = [];
  selectedApi:  Api | undefined;
  constructor(private apisService: ApiService, private router: Router) {}
// get APi
  ngOnInit(): void {
    this.getApis();
  }

// get liste des apis
private getApis():void{
  this.apisService.getListeApis().subscribe(
    data => {
      console.log('apis reçu', data);
      this.apis=data;
  },
  error => {
    console.error("error fetching apis ", error);
  });
}
getColor(index: number): string {
  return this.colors[index % this.colors.length];
}

private showErrorMessage(message: string): void {
  Swal.fire('Erreur', message, 'error');
}
// rechecher apis
  searchApi(): void {
    if (!this.searchKeyword) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        color : 'red',
        text: 'Veuillez entrer une API à rechercher !',
      });
      return;
    }

    this.apisService.searchApi(this.searchKeyword).subscribe(
      (result: Api[]) => {
        if (result.length != 0) {
          this.searchResults = result;
          console.log(this.searchResults);
          const formattedResults = this.searchResults.map(api => api.code).join(',');
          return;
        }

        if (result.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Information',
            color : 'blue' ,
            text: 'Aucune Api trouvée.',
          });
        }
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          color:'pink',
          text: 'Une erreur produite lors de la recherche de l API',
        });
      }
    );
  }

// consulter details apis
showDetails(api: Api): void {
    this.selectedApi = api;
    console.log("resultat de recherche : ", this.searchResults);

  }

  ajouterDemandeApi(api: Api) : void{
  this.selectedApi=api;
}

// filtrer apis
filtrerApi(nom : string){

    this.apisService.filtrerApi(nom).subscribe(
      (result: Api[]) => {
        console.log('Résultats filtrés :', result);
        this.apis=result;
        console.log(result);

      },
      error => {
        console.error('Erreur lors du filtrage :', error);
        this.showErrorMessage("erreur lors du filtrage");
      }
    );
}

onApiSelected(api: any) {
  this.selectedApi = api;
  console.log("resultat de recherche", this.searchResults);

}

}


