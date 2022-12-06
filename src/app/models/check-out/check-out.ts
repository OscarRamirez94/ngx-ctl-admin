import { Generic } from "../generic/generic";
import { Client } from "../client";
import { ProcessType } from "../process-type/process-type";
import { TransportLine } from "../transport-line/transport-line";
import { User } from "../user/user";
import { TransportCapacity } from "../transport_capacity/transport-capacity";
import { Pallet } from "../pallet/pallet";
import { CheckOutDetail } from "../check-out-detail/check-out-detail";


export class CheckOut implements Generic{
  id: number;
  name: string;
  search :string;
  remision: String;
  date: string;
  processType:ProcessType;
  partner: Client;
  transportLine:TransportLine;
  operator : String;
  ecoTracto : String;
  tractoPlacas: String;
  ecoCaja: String;
  cajaPlacas: String;
  transportCapacity:TransportCapacity;
  noSello : String;
  surveillance: User;
  responsible: User;
  observation: String;
  noRampa : String;
  pallets: Pallet[];
  status:string;
  noSello2 : String;
  user: User;
  checkOutDetails:CheckOutDetail[];
}
