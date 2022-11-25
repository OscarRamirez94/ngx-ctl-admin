import { TransportTypeI } from "./transport-type-i";


export interface TransportCapacityI {
  id: number ;
  name: string;
  capacity: string;
  unity: string;
  isActive: boolean;
  transportType:TransportTypeI;
}
