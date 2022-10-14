import { Profession } from "../profession/profession";
import { Generic } from "../generic/generic";
import { Client } from "../client";
import { ProcessType } from "../process-type/process-type";
import { Person } from "../person/person";
import { TransportLine } from "../transport-line/transport-line";
import { TransportCapacity } from "../transport_capacity/transport-capacity";
import { User } from "../user/user";

export class CheckList implements Generic{
    id: number;
    name: string;
    search :string;
    remision: String;
    date: Date;
    hours :String;
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
    surveillance: Person;
    responsible: User;
    observation: String;
    noRampa : String;

}
