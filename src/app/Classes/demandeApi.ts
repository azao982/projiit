import { Status } from './../status';
export class DemandeApi {
  constructor (
    public idDemande: number,
    public description: string,
    public reference: string,
    public nomapp: string,
    public hebergeurapp: string,
    public publie: boolean,
    public nomdomaineapp: string,
    public adresseipapp: string,
    public typeconnexion: string,
    public nombreappelan: number,
    public nombreappelmin: number,
    public invomasse: boolean,
    public payshebergeur: string,
    public dateinvmasse: Date,
    public raisoninmasse: string,
    public datecreation: Date,
    public datemodification: Date,
    public statut : Status
  ) {}
}
