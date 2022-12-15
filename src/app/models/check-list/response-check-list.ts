import { Profession } from "../profession/profession";
import { Generic } from "../generic/generic";
import { Client } from "../client";
import { ProcessType } from "../process-type/process-type";
import { Person } from "../person/person";
import { TransportLine } from "../transport-line/transport-line";
import { TransportCapacity } from "../transport_capacity/transport-capacity";
import { User } from "../user/user";
import { Pallet } from "../pallet/pallet";

export class ResponseCheckList implements Generic{

    name: string;
    search :string;
    //processType:ProcessType;
    id:number;
	  date:string;
	  remision:string;
    partner:Client;
	  transportLine:TransportLine;
    operator:string;
    tractoPlacas:string;
	  ecoTracto:string;
    cajaPlacas:string;
    ecoCaja:string;
	  transportCapacity:TransportCapacity;
    noSello:string;
	  surveillance:User;
    responsible:User;
    observation:string;
    noRampa:string;
    status:string;
	  user:User;
	  calculateTotal:number;
	  calculateStock:number;
	  totalCheckList:number;;
}
