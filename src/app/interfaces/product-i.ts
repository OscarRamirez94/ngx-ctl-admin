import { Client } from "../models/client";


export interface ProductoI {
  id: number ;
  name: string;
  isActive: boolean;
  search :string;
  code:string;
  partner:Client;
}
