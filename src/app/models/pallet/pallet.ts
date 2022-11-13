import { CheckList } from "../check-list/check-list";
import { CheckOut } from "../check-out/check-out";
import { Generic } from "../generic/generic";
import { Product } from "../product/product";
import { Unity } from "../unity/unity";


export class Pallet implements Generic {

  id: number ;
  name: string;
  search :string;
  noPallet: number;
  amount:number;
  um:Unity;
  lote:string;
  expiration:Date;
  codigo:string;
  product:Product;
  ua:string;
  checkOut:CheckOut;
  checkList:CheckList;
}
