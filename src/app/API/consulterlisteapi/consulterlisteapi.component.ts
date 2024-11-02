
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Api } from 'src/app/Classes/api';
import { ApiService } from 'src/app/Service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulterlisteapi',
  templateUrl: './consulterlisteapi.component.html',
  styleUrls: ['./consulterlisteapi.component.css']
})
export class ConsulterlisteapiComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 10; // Nombre d'éléments par page
  totalItems: number = 100; // Nombre total d'éléments
  pages: number[] = []; // Tableau pour stocker les numéros de page// Tableau pour stocker les numéros de page
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

  constructor(private apisService: ApiService, private router: Router) {
    this.calculatePages();
  }
// get APi
  ngOnInit(): void {
    console.log("comp initialized");
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
// supprimer api
supprimerApi(idApi: number): void {
  if (!idApi) {
    console.error("L'ID de l'API est indéfini.");
    return;
  }

  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Voulez-vous vraiment supprimer cet API ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('ID de l\'API à supprimer :', idApi);

      this.apisService.supprimerApi(idApi).subscribe(
        () => {

          this.getApis();
          this.showSuccessMessage('L\'API a été supprimée.');
        },
        error => {
          console.error('Échec de la suppression de l\'API :', error);
          this.showErrorMessage('Une erreur s\'est produite lors de la suppression de l\'API.');
        }
      );
    }
  });
}

private showSuccessMessage(message: string): void {
  Swal.fire('Supprimé!', message, 'success');
}

private showErrorMessage(message: string): void {
  Swal.fire('Erreur', message, 'error');
}

  redirigerVersPagemodifier(idApi:number){
  this.router.navigate(['/modifierApi',idApi]);
  }
  redirigerVersPageajoute(){
    this.router.navigate(['/Api'])
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
  }

// filtrer apis
trierApi(nom : string){

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

ajouterNouvelleApi(){
  this.router.navigate(["/Api"]);
}
calculatePages() {
  const totalPages = Math.ceil(this.totalItems / this.pageSize);
  this.pages = [];
  for (let i = 1; i <= totalPages; i++) {
    this.pages.push(i);
  }
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

nextPage() {
  if (this.currentPage < this.pages.length) {
    this.currentPage++;
  }
}

changePage(pageNumber: number) {
  this.currentPage = pageNumber;
}
}
