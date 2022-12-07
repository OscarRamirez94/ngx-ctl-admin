import { Generic } from "../generic/generic";
import { Client } from "../client";
import { ProcessType } from "../process-type/process-type";
import { TransportLine } from "../transport-line/transport-line";
import { User } from "../user/user";
import { TransportCapacity } from "../transport_capacity/transport-capacity";
import { Pallet } from "../pallet/pallet";
import { CheckOut } from "../check-out/check-out";
import { CheckOutDetail } from "./check-out-detail";


export class CheckOutDetailRequest implements Generic {

  id:number;
  name: string;
  search :string;
  checkOut: CheckOut;
  checkOutDetailDTO:CheckOutDetail[];

}
