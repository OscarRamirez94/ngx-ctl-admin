import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Pallet } from '../../../models/pallet/pallet';
import { HeadService } from '../../../services/head/head.service';
import { PalletService } from '../../../services/pallet/pallet.service';
import { ProductService } from '../../../services/product/product.service';
import { TransportLineService } from '../../../services/transport-line/transport-line.service';
import { CommonListPalletComponent } from '../../commons/common-list/common-list.component-pallet';
import { saveAs } from 'file-saver';
import { ReportService } from '../../../services/report/report.service';
@Component({
  selector: 'ngx-inventory-in',
  templateUrl: './inventory-in.component.html',
  styleUrls: ['./inventory-in.component.scss']
})
export class InventoryInComponent extends CommonListPalletComponent<Pallet, PalletService>  {

  actionBtn:String = "Buscar";
  name: string;
  titulo: string = "OUT";
  displayedColumns: string[] = ['remision','transportLine','date','name','code','ua','amount','um','lote','expiration'];
  clientName =  this.headService.getClientLS();
  option:string ="TODOS";
  filterBy:string =  "TODOS";
  pageSizeOptions = [25,50,100];


  constructor(service: PalletService, router: Router, route: ActivatedRoute,
     private dialog: MatDialog, toastrService: NbToastrService,
     headService:HeadService) {
    super(service, router, route, toastrService,headService);
  }


  viewRemisionEntrada(checkListId:number,status:string): void {
    this.router.navigate(['pages/checklist/pallet-main/' + checkListId + '/' + status]);
  }

}
