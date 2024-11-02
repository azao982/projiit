import { Profils } from "../profile";

export class User {
  constructor (
    public idUser:number,
    public cin : string,
    public nom : string,
    public prenom : string,
    public email : string,
    public mobile : string,
    public password : string,
    public grade:string,
    public cnrps:string,
    public fonction:string,
    public profile:Profils,

    )
    {}
}
