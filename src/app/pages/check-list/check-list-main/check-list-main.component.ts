import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CheckList } from '../../../models/check-list/check-list';
import { CheckListService } from '../../../services/check-list/check-list.service';
import { HeadService } from '../../../services/head/head.service';
import { CommonListCheckComponent } from '../../commons/common-list/common-list.component-check';
import { CommonListClientComponent } from '../../commons/common-list/common-list.component-client';
import { CheckListCreateComponent } from '../check-list-create/check-list-create.component';
import { CheckListDeleteComponent } from '../check-list-delete/check-list-delete.component';


@Component({
  selector: 'ngx-check-list-main',
  templateUrl: './check-list-main.component.html',
  styleUrls: ['./check-list-main.component.scss']
})
export class CheckListMainComponent extends CommonListCheckComponent<CheckList,CheckListService> {
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  name: string;
  processTypeId:string ="1";
  titulo:string = "CheckList";
  displayedColumns: string[] = ['id','remision','date','transportLine','transportType','noSello','status','pallets','actions' ];
  clientName =  this.headService.getClientLS();
  constructor( service:CheckListService,router: Router,route: ActivatedRoute,private dialog: MatDialog,
    toastrService: NbToastrService,
    headService:HeadService) {
    super(service,router, route,toastrService,headService);
    this.redirect = '/pages/clients/clientes';
    this.nombreModel = "CheckList";
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CheckListCreateComponent, {
      width: '65%'
    }).afterClosed().subscribe(data =>{
      if (data) {
        super.calculateRange(this.clientName);
      }
      });

      //this.router.navigate(['pages/checklist/checklist-create-test']);
  }

  addPallet(element:CheckList): void {
    //this.router.navigate(['pages/checklist/pallet-main/' + element.id]);
    this.router.navigate(['pages/checklist/pallet-main/' + element.id + '/' + element.status]);
  }


  editarClient(element:any){
    this.dialog.open(CheckListCreateComponent,{
      width:'65%',
      data: element


    }).afterClosed().subscribe(data =>{
        if (data) {
            super.calculateRange(this.clientName);
        }
      })
  }

  deleteClient(element:any){
    this.dialog.open(CheckListDeleteComponent,{
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
