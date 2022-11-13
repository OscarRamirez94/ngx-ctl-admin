import { CheckOut } from "../models/check-out/check-out";
import { Product } from "../models/product/product";
import { Unity } from "../models/unity/unity";


export interface PalletI {
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
}
