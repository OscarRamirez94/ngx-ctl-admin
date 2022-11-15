import { Generic } from "../generic/generic";
import { Client } from "../client";
import { ProcessType } from "../process-type/process-type";
import { TransportLine } from "../transport-line/transport-line";
import { User } from "../user/user";
import { TransportCapacity } from "../transport_capacity/transport-capacity";
import { Pallet } from "../pallet/pallet";
import { PalletOut } from "../pallet/pallet-out";


export class CheckOutSave {
  id: number;
  checkListId:number;
  palletsOut: Pallet[] = [];
}
