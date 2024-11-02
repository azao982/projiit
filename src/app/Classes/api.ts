import { Structure } from './structure';
export class Api {
  constructor(
    public idApi : number,
    public nom  :string,
    public code : string,
    public description : string,
    public input : string,
    public output : string,
    public cadreUtilisation : string,
    public url : string,
    public mode : string,
    public methode:string,
    public impact:string,
    public structure : Structure
      ) {}
}
