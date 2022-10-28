import { Generic } from "../generic/generic";
import { TransportCapacity } from "../transport_capacity/transport-capacity";


export class TransportType implements Generic  {
  id: number ;
  name: string;
  isActive: boolean;
  search :string;
  transportCapacity:TransportCapacity[]=[];
}
