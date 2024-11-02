import { ListStructureComponent } from './Structures/list-structure/list-structure.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AproposComponent } from './Others/apropos/apropos.component';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AccueilComponent } from './Others/accueil/accueil.component';
import { ErreurComponent } from './Others/erreur/erreur.component';
import { FooterComponent } from './Others/footer/footer.component';
import { AjouterapiComponent } from './API/ajouterapi/ajouterapi.component';
import { ConsulterlisteapiComponent } from './API/consulterlisteapi/consulterlisteapi.component';
import { DetailsapiComponent } from './API/detailsapi/detailsapi.component';
import { ModifierapiComponent } from './API/modifierapi/modifierapi.component';
import { ListDemandesComponent } from './DemandeApi/list-demandes/list-demandes.component';
import { DetailsDemandeComponent } from './DemandeApi/details-demande/details-demande.component';
import { ModifierUserComponent } from './CRUD_User/modifier-user/modifier-user.component';
import { ListUserComponent } from './CRUD_User/list-user/list-user.component';
import { AjouterStructureComponent } from './Structures/ajouter-structure/ajouter-structure.component';
import { ModifierStructureComponent } from './Structures/modifier-structure/modifier-structure.component';
import { DetailUserComponent } from './CRUD_User/detail-user/detail-user.component';
import { MailingUserComponent } from './CRUD_User/mailing-user/mailing-user.component';
import { DashboardAdminComponent } from './Dashboard_Users/dashboard-admin/dashboard-admin.component';
import { DashboardAdminDelegueComponent } from './Dashboard_Users/dashboard-admin-delegue/dashboard-admin-delegue.component';
import { DashboardConsumerComponent } from './Dashboard_Users/dashboard-consumer/dashboard-consumer.component';
import { DashboardValidateur1Component } from './Dashboard_Users/dashboard-validateur1/dashboard-validateur1.component';
import { DashboardValidateur2Component } from './Dashboard_Users/dashboard-validateur2/dashboard-validateur2.component';
import { ListApiConsumerComponent } from './API/list-api-consumer/list-api-consumer.component';
import { ValiderDemandeComponent } from './DemandeApi/valider-demande/valider-demande.component';
import { ModifierProfilComponent } from './CRUD_User/modifier-profil/modifier-profil.component';
import { DemandeEnCoursConsommateurComponent } from './DemandesConsummer/demande-en-cours-consommateur/demande-en-cours-consommateur.component';
import { DemandeRefuseeComponent } from './DemandesConsummer/demande-refusee/demande-refusee.component';
import { DemandeARectifierComponent } from './DemandesConsummer/demande-arectifier/demande-arectifier.component';
import { DemandeTermineeComponent } from './DemandesConsummer/demande-terminee/demande-terminee.component';
import { RectifierDemandeComponent } from './DemandeApi/rectifier-demande/rectifier-demande.component';
import { ValiderDem2Component } from './DemandeApi/valider-dem2/valider-dem2.component';
import { NgFor } from '@angular/common';
import { StatCompoComponent } from './stat-compo/stat-compo.component';
import { AjouterDemandeApiComponent } from './DemandeApi/ajouter-demande-api/ajouter-demande-api.component';
import { EnvoyerMailComponent } from './Mailing/envoyer-mail/envoyer-mail.component';
import { DetaildemandeAdminComponent } from './DemandeApi/detaildemande-admin/detaildemande-admin.component';
import { ListMailComponent } from './Mailing/list-mail/list-mail.component';
import { EnvoyerpasComponent } from './Mailing/envoyerpas/envoyerpas.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ModifierPasswordComponent } from './Dashboard_Users/modifier-password/modifier-password.component';
import { AppComponent } from './app.component';
import { Demande1ervalidComponent } from './DemandesConsummer/demande1ervalid/demande1ervalid.component';
import { HowitworkComponent } from './Others/howitwork/howitwork.component';
import { AuthGuardValidateur1Service } from './Security_Sur_APIS/auth-guard-validateur1.service';
import { AuthGuardValidateur2Service } from './Security_Sur_APIS/auth-guard-validateur2.service';
import { AuthGuardConsommateurService } from './Security_Sur_APIS/auth-guard-consommateur.service';
import { AuthGuardAdminService } from './Security_Sur_APIS/auth-guard-admin.service';
import { AuthGuardAdminDelegueeService } from './Security_Sur_APIS/auth-guard-admin-deleguee.service';
import { ListDemaEnCoursConsComponent } from './DemandeParConsom/list-dema-en-cours-cons/list-dema-en-cours-cons.component';
import { ListDemaTermineeConsComponent } from './DemandeParConsom/list-dema-terminee-cons/list-dema-terminee-cons.component';
import { ListDemaARectifConsComponent } from './DemandeParConsom/list-dema-arectif-cons/list-dema-arectif-cons.component';
import { ListDemaRefuseConsComponent } from './DemandeParConsom/list-dema-refuse-cons/list-dema-refuse-cons.component';
const routes: Routes = [

  // list demandes par consommateur
  {path:'listDemEnCoursCons', title:'listDemEnCoursCons', component:ListDemaEnCoursConsComponent},
  {path:'listDemRefuseeCons', title:'listDemARefuseeCons', component:ListDemaRefuseConsComponent},
  {path:'listDemTermineeCons', title:'listDemTermineeCons', component:ListDemaTermineeConsComponent},
  {path:'listDemARectifierCons', title:'listDemARectifierCons', component:ListDemaARectifConsComponent},



  // CRUDS Users done
  {path:'modifierProfil/:idUser', title:'modifierProfil/:idUser', component:ModifierProfilComponent},
  {path:'modifierUser/:idUser', title:'modifierUser/:idUser', component:ModifierUserComponent},
//  {path:'modifierUser/:idUser', title:'modifierUser/:idUser', component:ModifierUserComponent , canActivate:[AuthGuardAdminService]},

  {path:'modifierPassword/:idUser', title:'modifierPassword/:idUser', component:ModifierPasswordComponent},

  // {path:'listUser', title:'listUser', component:ListUserComponent},
  // {path: 'detailUser/:idUser',title:"detailUser", component:DetailUserComponent },
 {path:'listUser', title:'listUser', component:ListUserComponent , canActivate:[AuthGuardAdminService]},
  {path: 'detailUser/:idUser',title:"detailUser", component:DetailUserComponent , canActivate:[AuthGuardAdminService] },

  // Mailing
  {path: 'mailingUser/:idUser',title:"mailingUser", component:MailingUserComponent},
  // {path:'listmail',title:"listmail",component:ListMailComponent },
  {path:'listmail',title:"listmail",component:ListMailComponent , canActivate:[AuthGuardAdminService]},

  {path:'envoyerMail',title:"envoyerMail",component:EnvoyerMailComponent},
  {path:'envoyerpas',title:"envoyerPassword",component:EnvoyerpasComponent},

  // Dashboard Users
  // { path: 'DashboardAdmine',title:"DashboardAdmin", component:DashboardAdminComponent},
  // { path: 'DashboardAdminDeleguee',title:"DashboardAdminDeleguee", component:DashboardAdminDelegueComponent},
  // { path: 'DashboardConsommateur', title:"DashboardConsommateur", component:DashboardConsumerComponent},
  // { path: 'DashboardValid1',title:"DashboardValid1", component:DashboardValidateur1Component},
  // { path: 'DashboardValid2',title:"DashboardValid2", component:DashboardValidateur2Component},

  { path: 'DashboardAdmine',title:"DashboardAdmin", component:DashboardAdminComponent, canActivate:[AuthGuardAdminService]},
  { path: 'DashboardAdminDeleguee',title:"DashboardAdminDeleguee", component:DashboardAdminDelegueComponent , canActivate:[AuthGuardAdminDelegueeService]},
  { path: 'DashboardConsommateur', title:"DashboardConsommateur", component:DashboardConsumerComponent , canActivate:[AuthGuardConsommateurService]},
  { path: 'DashboardValid1',title:"DashboardValid1", component:DashboardValidateur1Component , canActivate:[AuthGuardValidateur1Service]},
  { path: 'DashboardValid2',title:"DashboardValid2", component:DashboardValidateur2Component , canActivate:[AuthGuardValidateur2Service]},

  // CRUDS APIS
  { path:'Api',title:"ajouterApi",component:AjouterapiComponent},
  { path:'listApi',title:"listApi",component:ConsulterlisteapiComponent},
  // { path:'listApiConsummer',title:"listApiConsummer",component:ListApiConsumerComponent },
  // { path: 'modifierApi/:idApi',title:"modifierApi/:idApi", component:ModifierapiComponent},

   { path:'listApiConsummer',title:"listApiConsummer",component:ListApiConsumerComponent , canActivate:[AuthGuardConsommateurService]},
   { path: 'modifierApi/:idApi',title:"modifierApi/:idApi", component:ModifierapiComponent, canActivate:[AuthGuardAdminService] },

  { path: 'detailsApi',title:"detailsApi", component:DetailsapiComponent},

  // CRUDS Structure
  { path:'ajouterStructure', title:'ajouterStructure', component:AjouterStructureComponent},
  { path:'modifierStructure/:id', title:'modifierStructure', component:ModifierStructureComponent},
  { path:'listStructure', title:'listStructure', component:ListStructureComponent},

  // CRUDS Demandes done
  { path:'listDemande',title:"listDemande",component:ListDemandesComponent},
  //{ path: 'rectifierDemande/:idDemande',title:"rectifierDemande", component:RectifierDemandeComponent},
  { path: 'rectifierDemande/:idDemande',title:"rectifierDemande", component:RectifierDemandeComponent, canActivate:[AuthGuardConsommateurService]},

  { path: 'detailDemande/:idDemande',title:"detailsDemande/:idDemande", component:DetailsDemandeComponent},
  { path: 'detailDemandeAdmin/:idDemande',title:"detailsDemandeAdmin/:idDemande", component:DetaildemandeAdminComponent},

  { path: 'validerDemande/:idDemande',title:"validerDemande/:idDemande", component:ValiderDemandeComponent},
  { path: 'validerDemande2/:idDemande',title:"validerDemande2/:idDemande", component:ValiderDem2Component},
  { path:'demandeEnCours',title:"DemandeEnCours",component:DemandeEnCoursConsommateurComponent},
  { path:'demandeRefusees',title:"DemandeRefusees",component:DemandeRefuseeComponent},
  { path:'demandeARectifier',title:"DemandeARectifier",component:DemandeARectifierComponent},
  { path:'demandeTerminee',title:"DemandeTerminee",component:DemandeTermineeComponent},
  { path:'demandeEnCours1ereValid',title:"demandeEnCours1ereValid",component:Demande1ervalidComponent},
  { path:'ajouterDemande',title:"ajouterDemandeeApi",component:AjouterDemandeApiComponent},
  // Statistics
   { path:'statistic',title:"statistic",component:StatCompoComponent,  canActivate:[AuthGuardAdminService]},
  //  { path:'statistic',title:"statistic",component:StatCompoComponent},

  { path:'app', component:AppComponent},
  // other Paths
  { path : 'howitwork', component : HowitworkComponent},
  { path:'accueil',title:"accueil" ,component:AccueilComponent},
  { path:'connexion',title:"connexion" ,component: ConnexionComponent  },
  { path:'footer',title:"footer" ,component:FooterComponent },
  { path:'apropos',title:"apropos",component:AproposComponent},
  { path:'',title:"Vide" ,component: AccueilComponent },
  { path:'**',title:"Erreur" ,component: ErreurComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ReactiveFormsModule,
  BrowserModule,


  ],
  exports: [RouterModule],

})
export class AppRoutingModule {
 }
