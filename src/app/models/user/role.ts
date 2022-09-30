import { Profession } from "../profession/profession";
import { Generic } from "../generic/generic";
import { timeStamp } from "console";



export class Role   {
  id: number ;
  name: string;

  constructor(id,name){
    this.id = id;
    this.name= name;
  }
}
