import { Profession } from "../profession/profession";
import { Generic } from "../generic/generic";



export class ProcessType  {
  id: number ;
  isActive: boolean;
  name: string;
  constructor(id,isActive,name){
    this.id =id;
    this.isActive =isActive;
    this.name = name;
  }
}
