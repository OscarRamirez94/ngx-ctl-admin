import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CheckList } from '../../../models/check-list/check-list';
import { CheckOutDetail } from '../../../models/check-out-detail/check-out-detail';
import { CheckOutDeatailService } from '../../../services/check-out-detail/check-out-detail.service';
import { HeadService } from '../../../services/head/head.service';
import { ProductService } from '../../../services/product/product.service';
import { TransportLineService } from '../../../services/transport-line/transport-line.service';
import { CommonListPalletOutComponent } from '../../commons/common-list/common-list.component-pallet-out';

@Component({
  selector: 'ngx-inventory-out',
  templateUrl: './inventory-out.component.html',
  styleUrls: ['./inventory-out.component.scss']
})
export class InventoryOutComponent extends CommonListPalletOutComponent<CheckOutDetail, CheckOutDeatailService>  {

  actionBtn:String = "Buscar";
  name: string;
  titulo: string = "OUT";
  displayedColumns: string[] = ['remisionSalida','remision','transportLine','name','code','amount','stock','ua','um','lote',];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  //'','date','name','code','ua','amount','um','lote','expiration','out'];
  clientName =  this.headService.getClientLS();
  option:string ="TODOS";
  filterBy:string =  "TODOS";

  remisionVisible:boolean=false;
  fechaVisible:boolean=false;
  transportLineVisible:boolean=false;
  productVisible:boolean=false;
  loteVisible:boolean=false;
  pageSizeOptions = [25,50,100];
  options: string[] = ['TODOS','REMISION', 'FECHA','LINEA DE TRANSPORTE','PRODUCTO','LOTE',"ou"];

  constructor(service: CheckOutDeatailService, router: Router, route: ActivatedRoute,
     private dialog: MatDialog, toastrService: NbToastrService,
     headService:HeadService,
     private productService:ProductService,
     private transportLineService:TransportLineService) {
    super(service, router, route, toastrService,headService);
  }

  viewRemisionSalida(checkOutId:number): void {
    //this.router.navigate(['pages/checklist/pallet-main/' + element.id]);
    this.router.navigate(['pages/checkout/pallet-view/' + checkOutId]);
  }
  viewRemisionEntrada(checkListId:number, status:string): void {
    //this.router.navigate(['pages/checklist/pallet-main/' + element.id]);
    this.router.navigate(['pages/checklist/pallet-main/' + checkListId + '/' + status]);
  }
}
