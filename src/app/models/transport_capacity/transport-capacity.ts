import { Generic } from "../generic/generic";
import { TransportType } from "../transport_type/transport-type";


export class TransportCapacity implements Generic  {
  id: number ;
  name: string;
  capacity: string;
  unity: string;
  isActive: boolean;
  search :string;
  transportType:TransportType;

}
