import { Profession } from "../profession/profession";
import { Generic } from "../generic/generic";
import { Client } from "../client";
import { ProcessType } from "../process-type/process-type";
import { Person } from "../person/person";
import { TransportLine } from "../transport-line/transport-line";
import { TransportCapacity } from "../transport_capacity/transport-capacity";

export class CheckList {
    id:number;
    remision: String;
    date: Date;
    hours :String;
    processType:ProcessType;
    partner: Client;
    transporLine:TransportLine;
    operator : String;
    ecoTracto : String;
    tractoPlacas: String;
    ecoCaja: String;
    cajaPlacas: String;
    transportCapacity:TransportCapacity;
    noSello : String;
    surveillance: Person;
    supervisor: Person;
    observation: String;
    noRampa : String;

   /*

    hours:  String;

    observation: String;




    processType:ProcessType;
    responsableOne:Person;
    responsableTwo:Person;


*/
}
