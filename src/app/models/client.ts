import { Address } from "./address/address";
import { Generic } from "./generic/generic";

export class Client implements Generic {
  id: number ;
  name:string;
  isActive:boolean;
  search :string;
  address :Address;
  prefix:string;
}
