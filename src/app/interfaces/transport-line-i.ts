import { Client } from "../models/client";


export interface TransportLineI {
  id: number ;
  name: string;
  isActive: boolean;
  search :string;
  partner:Client
}
