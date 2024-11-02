import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MailService } from 'src/app/Service/mail.service';
import { Email } from 'src/app/email';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-envoyerpas',
  templateUrl: './envoyerpas.component.html',
  styleUrls: ['./envoyerpas.component.css']
})
export class EnvoyerpasComponent {
  email: string = '';
  password: string = '';
  mails : Email[]=[];
  mail : Email;
  mailForm : FormGroup;
  userForm : FormGroup;
  formulaire : boolean=false;
formData: any = {
    id:0,
    toEmail: '',
    subject: '',
    body: '',
  };
// constucteur pour
constructor(private emailService : MailService, private fb: FormBuilder, private activatedRoute: ActivatedRoute,private router:Router) {}

ngOnInit(): void {
  this.userForm = this.fb.group({
    nom: ['', [Validators.required, Validators.minLength(3)]],
    prenom: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    cin :[''],
    grade : [''],
    fonction : [''],
    mobile : ['']
  });

  this.mailForm = this.fb.group({
    toEmail: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    body: ['', [Validators.required]],
  });
}

//appel de la classe demande
onAjouter() {
  console.log(this.mailForm.value);
  if (this.mailForm.valid) {
    this.formData = this.mailForm.value; // Obtenir les valeurs du formulaire
    this.emailService.addMail(this.formData).subscribe(
      data => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Succès !',
          color : "green",
          text: 'Email ajouté avec succès',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/listmail']);
          }
        });
      },
      error => {
        console.error('Erreur lors de l ajout d"un mail',  error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          color : "red",
          text: 'Une erreur s\'est produite lors de l\'ajout de l\"email. Veuillez réessayer.',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}


}
// }
// import { StorageService } from './../../Service/storage.service';
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { User } from 'src/app/Classes/user';
// import { MailService } from 'src/app/Service/mail.service';
// import { Email } from 'src/app/email';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-envoyerpas',
//   templateUrl: './envoyerpas.component.html',
//   styleUrls: ['./envoyerpas.component.css']
// })
// export class EnvoyerpasComponent {
//   email: string = '';
//   password: string = '';
//   mails: Email[] = [];
//   mail: Email;
//   user : User ;
//   selectedEmail: Email | undefined;
//   searchKeyword: string = '';
//   searchResults: Email[] = [];
//   mailForm: FormGroup;
//   formulaire: boolean = false;
//   formData: any = {
//     id: 0,
//     toEmail: '',
//     subject: '',
//     body: '',
//   };

// // constucteur pour
// constructor(private emailService : MailService, private StorageService : StorageService, private fb: FormBuilder, private activatedRoute: ActivatedRoute,private router:Router) {}
// statusOptions : string []= [];

// ngOnInit(): void {
//   const user = this.StorageService.getUser();
//   this.mailForm = this.fb.group({
//     toEmail: [user?.email || '', [Validators.required, Validators.email]],
//       subject: ['', [Validators.required]],
//       body: [user?.password || '', [Validators.required]],
//   });
//   this.getmail();
// }
// userColors: string[] = ['#FADBD8', '#D6EAF8', '#D5DBDB', '#FCF3CF', '#D1F2EB', '#FDEDEC'];
// userIconColors: string[] = ['#9b59b6', '#3498db', '#34495e', '#2ecc71', '#e67e22', '#f1c40f'];
// userContainerColors: string[] = ['#F5B7B1', '#AED6F1', '#ABB2B9', '#F9E79F', '#A9DFBF', '#FAD7A0'];
// private getmail():void{
// this.emailService.getListemails().subscribe(data => {
//   this.mails=data;
// })


// }

// //appel de la classe demande

// onAjouter() {
//   console.log(this.mailForm.value);
//   if (this.mailForm.valid) {
//     this.formData = this.mailForm.value; // Obtenir les valeurs du formulaire
//     this.emailService.envoyerPass(this.formData).subscribe(
//       data => {
//         console.log(data);
//         Swal.fire({
//           icon: 'success',
//           title: 'Succès !',
//           color : "green",
//           text: 'Email ajouté avec succès',
//           confirmButtonText: 'OK',
//         }).then((result) => {
//           if (result.isConfirmed) {
//             this.router.navigate(['/listmail']);
//           }
//         });
//       },
//       error => {
//         console.error('Erreur lors de l ajout d"un mail',  error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Erreur',
//           color : "red",
//           text: 'Une erreur s\'est produite lors de l\'ajout de l\"email. Veuillez réessayer.',
//           confirmButtonText: 'OK',
//         });
//       }
//     );
//   }
// }



// }


