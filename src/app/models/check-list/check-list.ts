import { Profession } from "../profession/profession";
import { Generic } from "../generic/generic";
import { Client } from "../client";
import { ProcessType } from "../process-type/process-type";
import { Person } from "../person/person";
import { TransportLine } from "../transport-line/transport-line";
import { TransportCapacity } from "../transport_capacity/transport-capacity";
import { User } from "../user/user";
import { Pallet } from "../pallet/pallet";

export class CheckList implements Generic{
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
    stock:string;
    user: User;
}
