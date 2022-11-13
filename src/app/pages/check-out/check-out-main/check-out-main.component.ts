import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CheckList } from '../../../models/check-list/check-list';
import { CheckOut } from '../../../models/check-out/check-out';
import { CheckListService } from '../../../services/check-list/check-list.service';
import { CheckOutService } from '../../../services/check-out/check-out.service';
import { HeadService } from '../../../services/head/head.service';
import { CommonListCheckComponent } from '../../commons/common-list/common-list.component-check';
import { CommonListClientComponent } from '../../commons/common-list/common-list.component-client';
import { CheckOutCreateComponent } from '../check-out-create/check-out-create.component';
import { CheckOutDeleteComponent } from '../check-out-delete/check-out-delete.component';

@Component({
  selector: 'ngx-check-out-main',
  templateUrl: './check-out-main.component.html',
  styleUrls: ['./check-out-main.component.scss']
})
export class CheckOutMainComponent extends CommonListCheckComponent<CheckOut,CheckOutService> {
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  processTypeId:string ="2";
  name: string;
  titulo:string = "CheckOut";
  displayedColumns: string[] = ['id','remision','date','transportLine','transportType','noSello','status','pallets','actions' ];
  clientName =  this.headService.getClientLS();
  constructor( service:CheckOutService,router: Router,route: ActivatedRoute,private dialog: MatDialog,
    toastrService: NbToastrService,
    headService:HeadService) {
    super(service,router, route,toastrService,headService);
    this.redirect = '/pages/clients/clientes';
    this.nombreModel = "CheckOut";
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CheckOutCreateComponent, {
      width: '65%'
    }).afterClosed().subscribe(data =>{
      if (data) {
        super.calculateRange(this.clientName);
      }
      });

      //this.router.navigate(['pages/checklist/checklist-create-test']);
  }

  addPallet(element:CheckOut): void {
    //this.router.navigate(['pages/checklist/pallet-main/' + element.id]);
    this.router.navigate(['pages/checkout/pallet-main-test/' + element.id + '/' + element.status]);
  }


  editarClient(element:any){
    this.dialog.open(CheckOutCreateComponent,{
      width:'65%',
      data: element


    }).afterClosed().subscribe(data =>{
        if (data) {
            super.calculateRange(this.clientName);
        }
      })
  }

  deleteClient(element:any){
    this.dialog.open(CheckOutDeleteComponent,{
      width:'25%',
      data: element
    }).afterClosed().subscribe(data =>{
        if (data) {
            super.calculateRange(this.clientName);
        }
      })
  }

  closeRemision(element:any){
    this.service.updateStatus(element).subscribe(data =>{
      super.toast("success","Se finalizó la remision")
      super.calculateRange(this.clientName);
    });

  }

}
