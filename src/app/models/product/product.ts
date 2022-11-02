import { Profession } from "../profession/profession";
import { Generic } from "../generic/generic";
import { Client } from "../client";



export class Product implements Generic  {
  id: number ;
  name: string;
  isActive: boolean;
  search :string;
  code:string;
  partner:Client;
}
