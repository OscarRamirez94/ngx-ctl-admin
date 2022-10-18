import { Client } from "../client";
import { Generic } from "../generic/generic";


export class TransportLine implements Generic  {
  id: number ;
  name: string;
  isActive: boolean;
  search :string;
  partner:Client
}
