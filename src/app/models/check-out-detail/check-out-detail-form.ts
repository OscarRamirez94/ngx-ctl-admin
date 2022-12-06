import { Generic } from "../generic/generic";
import { Client } from "../client";
import { ProcessType } from "../process-type/process-type";
import { TransportLine } from "../transport-line/transport-line";
import { User } from "../user/user";
import { TransportCapacity } from "../transport_capacity/transport-capacity";
import { Pallet } from "../pallet/pallet";
import { CheckOut } from "../check-out/check-out";


export class CheckOutDetailForm{
  id:number;
  amount:number;
  checkOutId: number;
  pallet:Pallet;
  checkListId:number;

}
