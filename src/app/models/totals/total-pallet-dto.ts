import { CheckList } from "../check-list/check-list";
import { Generic } from "../generic/generic";
import { Product } from "../product/product";
import { Unity } from "../unity/unity";


export class TotalPalletDTO  {

	  total:number = 0;
	  productoTotal:Map<string, number> = new Map<string, number>();
}
