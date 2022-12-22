import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Pallet } from '../../../models/pallet/pallet';
import { HeadService } from '../../../services/head/head.service';
import { PalletService } from '../../../services/pallet/pallet.service';
import { CommonListPalletInventoryInComponent } from '../../commons/common-list/common-list.component-inventory-in';


@Component({
  selector: 'ngx-inventory-in',
  templateUrl: './inventory-in.component.html',
  styleUrls: ['./inventory-in.component.scss']
})
export class InventoryInComponent extends CommonListPalletInventoryInComponent<Pallet, PalletService>  {

  actionBtn:String = "Buscar";
  name: string;
  titulo: string = "OUT";
  displayedColumns: string[] = ['remision','transportLine','date','name','code','ua','amount','um','lote','expiration'];
  clientName =  this.headService.getClientLS();
  option:string ="TODOS";
  filterBy:string =  "TODOS";
  pageSizeOptions = [25,50,100];
  loading:boolean = true;

  constructor(service: PalletService, router: Router, route: ActivatedRoute,
     private dialog: MatDialog, toastrService: NbToastrService,
     headService:HeadService) {
    super(service, router, route, toastrService,headService);
  }


  viewRemisionEntrada(checkListId:number,status:string): void {
    this.router.navigate(['pages/checklist/pallet-main/' + checkListId + '/' + status]);
  }

}
