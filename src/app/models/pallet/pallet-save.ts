import { Generic } from "../generic/generic";
import { Pallet } from "./pallet";


export class PalletSave  implements Generic {
  id: number ;
  name: string;
  search :string;
  checkListId: number;
  palletsDTO:Pallet;
}
