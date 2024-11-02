import { NgModule } from '@angular/core';
import{HttpClientModule} from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Others/navbar/navbar.component';
import { AproposComponent } from './Others/apropos/apropos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './Others/footer/footer.component';
import { AccueilComponent } from './Others/accueil/accueil.component';
import { ErreurComponent } from './Others/erreur/erreur.component';
import { AjouterapiComponent } from './API/ajouterapi/ajouterapi.component';
import { ConsulterlisteapiComponent } from './API/consulterlisteapi/consulterlisteapi.component';
import { DetailsapiComponent } from './API/detailsapi/detailsapi.component';
import { ModifierapiComponent } from './API/modifierapi/modifierapi.component';
import { DetailsDemandeComponent } from './DemandeApi/details-demande/details-demande.component';
import { ListDemandesComponent } from './DemandeApi/list-demandes/list-demandes.component';
import { ModifierUserComponent } from './CRUD_User/modifier-user/modifier-user.component';
import { ListUserComponent } from './CRUD_User/list-user/list-user.component';
import { DetailUserComponent } from './CRUD_User/detail-user/detail-user.component';
import { AjouterStructureComponent } from './Structures/ajouter-structure/ajouter-structure.component';
import { ModifierStructureComponent } from './Structures/modifier-structure/modifier-structure.component';
import { DashboardAdminComponent } from './Dashboard_Users/dashboard-admin/dashboard-admin.component';
import { DashboardConsumerComponent } from './Dashboard_Users/dashboard-consumer/dashboard-consumer.component';
import { DashboardValidateur1Component } from './Dashboard_Users/dashboard-validateur1/dashboard-validateur1.component';
import { DashboardValidateur2Component } from './Dashboard_Users/dashboard-validateur2/dashboard-validateur2.component';
import { DashboardAdminDelegueComponent } from './Dashboard_Users/dashboard-admin-delegue/dashboard-admin-delegue.component';
import { MailingUserComponent } from './CRUD_User/mailing-user/mailing-user.component';
import { ValiderDemandeComponent } from './DemandeApi/valider-demande/valider-demande.component';
import { ModifierProfilComponent } from './CRUD_User/modifier-profil/modifier-profil.component';
import { CommonModule } from '@angular/common';
import { ListApiConsumerComponent } from './API/list-api-consumer/list-api-consumer.component';
import { DemandeEnCoursConsommateurComponent } from './DemandesConsummer/demande-en-cours-consommateur/demande-en-cours-consommateur.component';
import { DemandeRefuseeComponent } from './DemandesConsummer/demande-refusee/demande-refusee.component';
import { DemandeTermineeComponent } from './DemandesConsummer/demande-terminee/demande-terminee.component';
import { DemandeARectifierComponent } from './DemandesConsummer/demande-arectifier/demande-arectifier.component';
import { DetailConsommateurComponent } from './DemandesConsummer/detail-Demandeconsommateur/detail-consommateur.component';
import { AjouterDemandeApiComponent } from './DemandeApi/ajouter-demande-api/ajouter-demande-api.component';
import { RectifierDemandeComponent } from './DemandeApi/rectifier-demande/rectifier-demande.component';
import { ValiderDem2Component } from './DemandeApi/valider-dem2/valider-dem2.component';
import { ListStructureComponent } from './Structures/list-structure/list-structure.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DetaildemandeAdminComponent } from './DemandeApi/detaildemande-admin/detaildemande-admin.component';
import { EnvoyerMailComponent } from './Mailing/envoyer-mail/envoyer-mail.component';
import { EnvoyerpasComponent } from './Mailing/envoyerpas/envoyerpas.component';
import { ListMailComponent } from './Mailing/list-mail/list-mail.component';
import { ModifierPasswordComponent } from './Dashboard_Users/modifier-password/modifier-password.component';
import { HowitworkComponent } from './Others/howitwork/howitwork.component';
import { HomeserviceComponent } from './Others/homeservice/homeservice.component';
import { HeaderComponent } from './Others/header/header.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { StatCompoComponent } from './stat-compo/stat-compo.component';
import { Demande1ervalidComponent } from './DemandesConsummer/demande1ervalid/demande1ervalid.component';
import { ListDemaRefuseConsComponent } from './DemandeParConsom/list-dema-refuse-cons/list-dema-refuse-cons.component';
import { ListDemaARectifConsComponent } from './DemandeParConsom/list-dema-arectif-cons/list-dema-arectif-cons.component';
import { ListDemaTermineeConsComponent } from './DemandeParConsom/list-dema-terminee-cons/list-dema-terminee-cons.component';
import { ListDemaEnCoursConsComponent } from './DemandeParConsom/list-dema-en-cours-cons/list-dema-en-cours-cons.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConnexionComponent,
StatCompoComponent,
    AproposComponent,
    FooterComponent,
    AccueilComponent,
    ErreurComponent,
    AjouterapiComponent,
    ListStructureComponent,
    ConsulterlisteapiComponent,
    DetailsapiComponent,
    ModifierapiComponent,
    DetailsDemandeComponent,
    ListDemandesComponent,
    ModifierUserComponent,
    ListUserComponent,
    DetailUserComponent,
    AjouterStructureComponent,
    ModifierStructureComponent,
    StatCompoComponent,
    DashboardAdminComponent,
    DashboardConsumerComponent,
    DashboardValidateur1Component,
    DashboardValidateur2Component,
    DashboardAdminDelegueComponent,
    MailingUserComponent,
    ValiderDemandeComponent,
    ModifierProfilComponent,
    ListApiConsumerComponent,
    DemandeEnCoursConsommateurComponent,
    DemandeRefuseeComponent,
    DemandeTermineeComponent,
    DemandeARectifierComponent,
    DetailConsommateurComponent,
    AjouterDemandeApiComponent,
    RectifierDemandeComponent,
    ListMailComponent,
    ValiderDem2Component,
    DetaildemandeAdminComponent,
    EnvoyerMailComponent,
    EnvoyerpasComponent,
    ModifierPasswordComponent,
    HowitworkComponent,
    HomeserviceComponent,
    HeaderComponent,
    StatCompoComponent,
    Demande1ervalidComponent,
    ListDemaRefuseConsComponent,
    ListDemaARectifConsComponent,
    ListDemaTermineeConsComponent,
    ListDemaEnCoursConsComponent,

    ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
