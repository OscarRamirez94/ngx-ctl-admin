import { CheckList } from "../check-list/check-list";
import { Generic } from "../generic/generic";
import { Unity } from "../unity/unity";


export class Pallett implements Generic {

  id: number ;
  name: string;
  search :string;
  noPallet: number;
  amount:number;
  um:Unity;
  lote:string;
  expiration:Date;
  codigo:string;
  producto:string;
  ua:string;
}
