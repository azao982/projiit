import { Structure } from './../../Classes/structure';
import { StructureService } from 'src/app/Service/structure.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { User } from 'src/app/Classes/user';
import { AuthService } from 'src/app/Service/auth.service';
import { MailService } from 'src/app/Service/mail.service';
import { UserService } from 'src/app/Service/user.service';
import { Profils } from 'src/app/profile';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  profiles:Profils;
   avatars: string[] = [
    'https://bootdey.com/img/Content/avatar/avatar4.png',
    'https://bootdey.com/img/Content/avatar/avatar1.png',
    'https://bootdey.com/img/Content/avatar/avatar5.png',
    'https://bootdey.com/img/Content/avatar/avatar6.png',
    'https://bootdey.com/img/Content/avatar/avatar3.png',
    'https://bootdey.com/img/Content/avatar/avatar7.png',
    'https://bootdey.com/img/Content/avatar/avatar2.png',
    'https://bootdey.com/img/Content/avatar/avatar8.png',
  ];
  users: User[] = [];
  selectedProfile: Profils | undefined;
  structureId: number;
  searchKeyword: string = '';
  searchResults: User[] = [];
  userForm: FormGroup;
  mailForm: FormGroup;
  profileOptions: string[] = Object.values(Profils);
  structures: Structure[] = [];
  structure : Structure;
  userColors: string[] = ['#FADBD8', '#D6EAF8', '#D5DBDB', '#FCF3CF', '#D1F2EB', '#FDEDEC'];
  userIconColors: string[] = ['#9b59b6', '#3498db', '#34495e', '#2ecc71', '#e67e22', '#f1c40f'];
  userContainerColors: string[] = ['#F5B7B1', '#AED6F1', '#ABB2B9', '#F9E79F', '#A9DFBF', '#FAD7A0'];
  user: any = {
    nom: "",
    prenom: "",
    email: "",
    cin: "",
    mobile: "",
    fonction: "",
    grade: "",
    password: "",
    cnrps: "",
    profile: ""
  }

  constructor(
    private userService: UserService,
    private structureService : StructureService,
    private authService: AuthService,
    private emailService: MailService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
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

  ngOnInit(): void {
    this.mailForm = this.fb.group({
      toEmail: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      cnrps: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      grade: ['', [Validators.required]],
      fonction: ['', [Validators.required]],
      profile: ['', Validators.required],
      structure :['']
    });
    this.profileOptions = Object.values(Profils);
    this.getUser();
    this.getStructure();
  }

  private getUser(): void {
    this.userService.getListeUsers().subscribe(data => {
      this.users = data;
    });
  }

  modifierUser(idUser: number): void {
    this.router.navigate(['/modifierUser', idUser]);
  }

  detailUser(idUser: number): void {
    this.router.navigate(['/detailUser', idUser]);
  }

  supprimerUser(idUser: number): void {
    if (idUser === undefined || idUser === null) {
      console.error('ID utilisateur non défini');
      return;
    }

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer cet utilisateur!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.supprimerUser(idUser).subscribe(
          () => {
            Swal.fire('Succès', 'Utilisateur supprimé avec succès', 'success');
            this.getUser();
          },
          error => {
            console.error('Échec suppression utilisateur');
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression de l\'utilisateur', 'error');
          }
        );
      }
    });
  }
  onAjouter(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.structureId = formData.structure;
      console.log("structureId",this.structureId);
      this.authService.Register(formData,this.structureId).subscribe(
        data => {
          // const email = formData.email;
          // const password = formData.password;
          // // Pré-remplir le formulaire de mailing
          // this.mailForm.patchValue({
          //   toEmail: email,
          //   subject: 'Bienvenue à notre service',
          //   body: `Votre compte a été créé avec succès.\n\nVoici vos informations de connexion:\nEmail: ${email}\nMot de passe: ${password}\n\nMerci de nous rejoindre!`
          // });
          // this.onEnvoyerMail();
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Utilisateur ajouté avec succès avec l\'envoi de leur compte dans l\'email.',
            confirmButtonText: 'OK',
          }).then(() => {
            window.location.reload();
          });

        },
        error => {
          console.error('Erreur lors de l\'ajout de User', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de l\'ajout de l\'utilisateur. Veuillez réessayer.',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }

  // onEnvoyerMail(): void {
  //   if (this.mailForm.valid) {
  //     const formData = this.mailForm.value;
  //     this.emailService.envoyerPass(formData).subscribe(
  //       () => {
  //       },
  //       error => {
  //         Swal.fire({
  //           icon: 'warning',
  //           title: 'Erreur',
  //           text: 'Une erreur s\'est produite lors de l\'envoi de l\'email. Veuillez réessayer.',
  //           confirmButtonText: 'OK',
  //         });
  //       }
  //     );
  //   } else {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Formulaire invalide',
  //       text: 'Veuillez remplir tous les champs requis.',
  //       confirmButtonText: 'OK',
  //     });
  //   }
  // }

  RechercherUser(): void {
    if (!this.searchKeyword) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Veuillez entrer un utilisateur à rechercher !',
      });
      return;
    }

    this.userService.searchUser(this.searchKeyword).subscribe(
      (result: User[]) => {
        this.searchResults = result;
        if (result.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: 'Aucun utilisateur trouvé.',
          });
        }
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la recherche de l\'utilisateur.',
        });
      }
    );
  }

  filtrerUser(): void {
    if (this.selectedProfile) {
      this.userService.filtrerUser(this.selectedProfile).subscribe(
        (result: User[]) => {
          this.users = result;
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors du filtrage.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Profil non défini',
        text: 'Veuillez sélectionner un profil pour filtrer.',
      });
    }
  }

  envoyerMotDePasse(): void {
    if (this.mailForm.valid) {
      const formData = this.mailForm.value;
      this.emailService.addMail(formData).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Succès !',
            text: 'Email envoyé avec succès',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/listmail']);
            }
          });
        },
        error => {
          Swal.fire({
            icon: 'warning',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de l\'envoi de l\'email. Veuillez réessayer.',
            confirmButtonText: 'OK',
          });
        }
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

  openModal(): void {
    const modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = "block";
    }
  }

  closeModal(): void {
    const modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = "none";
    }
  }
}
