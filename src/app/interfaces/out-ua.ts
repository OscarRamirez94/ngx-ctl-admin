import { CheckList } from "../models/check-list/check-list";
import { CheckOut } from "../models/check-out/check-out";
import { Product } from "../models/product/product";
import { Unity } from "../models/unity/unity";


export interface OutUa {

    cantidad: number,
    remision: string,
    um: string,
    lote:string,
    codigo: string,
    stock :number,
    producto:  string,
    fechaIngreso: string,
    licencia: string
    palletId:number;
    checkListId:number;
    productId:number;
}
