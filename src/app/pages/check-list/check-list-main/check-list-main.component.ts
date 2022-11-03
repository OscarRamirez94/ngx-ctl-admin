import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CheckList } from '../../../models/check-list/check-list';
import { CheckListService } from '../../../services/check-list/check-list.service';
import { HeadService } from '../../../services/head/head.service';
import { CommonListClientComponent } from '../../commons/common-list/common-list.component-client';
import { CheckListCreateComponent } from '../check-list-create/check-list-create.component';


@Component({
  selector: 'ngx-check-list-main',
  templateUrl: './check-list-main.component.html',
  styleUrls: ['./check-list-main.component.scss']
})
export class CheckListMainComponent extends CommonListClientComponent<CheckList,CheckListService> {

  name: string;
  titulo:string = "CheckList";
  displayedColumns: string[] = ['id','remision','date','transportLine','transportType','noSello','pallets','actions' ];
  clientName =  this.headService.getClientLS();
  constructor( service:CheckListService,router: Router,route: ActivatedRoute,private dialog: MatDialog,
    toastrService: NbToastrService,
    headService:HeadService) {
    super(service,router, route,toastrService,headService);
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
    this.router.navigate(['pages/checklist/pallet-main/' + element.id]);
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
    this.dialog.open(CheckListCreateComponent,{
      width:'25%',
      data: element
    }).afterClosed().subscribe(data =>{
        if (data) {
            super.calculateRange(this.clientName);
        }
      })
  }

}
