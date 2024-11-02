import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../../Service/demande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from 'src/app/status';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import { Email } from 'src/app/email';
import { MailService } from 'src/app/Service/mail.service';

@Component({
  selector: 'app-valider-demande',
  templateUrl: './valider-demande.component.html',
  styleUrls: ['./valider-demande.component.css']
})
export class ValiderDemandeComponent implements OnInit {
  mails : Email[] = [];
  mail : Email;
  selectedEmail : Email | undefined;
  searchKeyword: string = '';
  searchResults: Email[] = [];
  mailForm : FormGroup;
  formulaire : boolean = false;
  formData: any = {
    id: 0,
    toEmail: '',
    subject: '',
    body: '',
  };

  constructor(private demandeService: DemandeService, private emailService: MailService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {}

  statusOptions : string[] = [];

  ngOnInit(): void {
    this.mailForm = this.fb.group({
      toEmail: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
    this.getmail();
  }

  // Couleurs pour les icônes et les conteneurs
  userColors: string[] = ['#FADBD8', '#D6EAF8', '#D5DBDB', '#FCF3CF', '#D1F2EB', '#FDEDEC'];
  userIconColors: string[] = ['#9b59b6', '#3498db', '#34495e', '#2ecc71', '#e67e22', '#f1c40f'];
  userContainerColors: string[] = ['#F5B7B1', '#AED6F1', '#ABB2B9', '#F9E79F', '#A9DFBF', '#FAD7A0'];

  private getmail(): void {
    this.emailService.getListemails().subscribe(data => {
      this.mails = data;
    });

    const idDemande: any = this.activatedRoute.snapshot.paramMap.get('idDemande');
    this.demandeService.getById(idDemande).subscribe(demande => {
      this.statusOptions = Object.values(Status).filter(status =>
        status === Status.enCoursConsommateur || status === Status.à_rectifier || status === Status.en_cours_1ere_validation
      );

      this.demande = demande;
      this.demande.datecreation = new Date(demande.datecreation).toISOString().split('T')[0];
      this.demande.datemodification = new Date().toISOString().split('T')[0];
      this.demande.dateinvmasse = new Date(demande.dateinvmasse).toISOString().split('T')[0];
    });
  }

  demande: any = {
    description: "",
    reference: "",
    hebergeurapp: "",
    publie: "",
    nomapp: "",
    nomdomaineapp: "",
    adresseipapp: "",
    typeconnexion: "",
    nombreappelan: "",
    nombreappelmin: "",
    invomasse: "",
    payshebergeur: "",
    dateinvmasse: "",
    raisoninmMasse: "",
    datecreation: "",
    datemodification: "",
    statut: Status.enCoursConsommateur,
    commentaire: ''
  };
//valider demande
  validerDemande() {
    Swal.fire({
      icon: 'question',
      title: 'Voulez-vous vraiment valider cette demande?',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandeService.updateDemande(this.demande, this.demande.idDemande).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Demande validée 1er niveau!',
            text: 'La demande a été validée avec succès!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            showCancelButton: true,
            cancelButtonText: 'Envoyer Mail',
            cancelButtonColor: '#007bff'
          }).then((result) => {
            if (result.isDismissed) {
              const modalElement = document.getElementById('user-form-modal');
              const modal = new bootstrap.Modal(modalElement);
              modal.show();
            } else {
              this.router.navigate(['/DashboardValid1']);
            }
          });
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors du validation de la demande.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
        });
      }
    });
  }
  onEnvoyerMail() {
    this.mailForm.patchValue({
      subject: this.mailForm.get('subject')?.value + '\n\n Statut demande ',
      body: `<div style="font-family: Arial, sans-serif;">
              <p>Nous avons bien traité votre demande de Référence N° : <strong>${this.demande.reference}</strong></p>
              <p> a le statut: <span style="color: ${this.demande.statut === 'enCoursConsommateur' ? 'green' : 'red'};">
                <i class="fa ${this.demande.statut === 'enCoursConsommateur' ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                ${this.demande.statut}</span> Veuillez imprimer votre contrat de service</p>
            </div>`
    });

    if (this.mailForm.valid) {
      this.formData = this.mailForm.value;
      this.emailService.addMail(this.formData).subscribe(
        (data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Succès !',
            color: 'green',
            text: data,
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/listmail']);
            }
          });
        },
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulaire invalide',
        text: 'Veuillez remplir tous les champs requis.',
        confirmButtonText: 'OK',
      });
    }
  }

  //rectifier demander
  rectifierDemande() {
    Swal.fire({
      icon: 'question',
      title: 'Voulez-vous vraiment rectifier cette demande?',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandeService.updateDemande(this.demande, this.demande.idDemande).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Demande à rectifier!',
            text: 'La demande a été rectifiée avec succès!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            showCancelButton: true,
            cancelButtonText: 'Envoyer Mail',
            cancelButtonColor: '#007bff'
          }).then((result) => {
            if (result.isDismissed) {
              const modalElement = document.getElementById('user-form-modal');
              const modal = new bootstrap.Modal(modalElement);
              modal.show();
            } else {
              this.router.navigate(['/DashboardValid1']);
            }
          });
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors du rectification de la demande.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
        });
      }
    });
  }
}
