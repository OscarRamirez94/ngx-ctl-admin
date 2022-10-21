import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CheckList } from '../../../models/check-list/check-list';
import { Pallet } from '../../../models/pallet/pallet';
import { CheckListService } from '../../../services/check-list/check-list.service';
import { HeadService } from '../../../services/head/head.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
import { CheckListCreateComponent } from '../check-list-create/check-list-create.component';
import { PalletMainComponent } from '../pallet/pallet-main/pallet-main.component';

@Component({
  selector: 'ngx-check-list-main',
  templateUrl: './check-list-main.component.html',
  styleUrls: ['./check-list-main.component.scss']
})
export class CheckListMainComponent extends CommonListComponent<CheckList,CheckListService> {

  name: string;
  titulo:string = "CheckList";
  displayedColumns: string[] = ['id','remision','date','hours',
  'transportLine','transportType',
  'noSello','pallets','actions' ];

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
        super.calculateRange();
      }
      });
  }

  addPallet(element:CheckList): void {
    this.router.navigate(['pages/checklist/pallet-main/' + element.id]);
  }

  editarClient(element:any){
    this.dialog.open(CheckListCreateComponent,{
      width:'65%',
      data: element


    }).afterClosed().subscribe(data =>{
        if (data) {
            super.calculateRange();
        }
      })
  }

  deleteClient(element:any){
    this.dialog.open(CheckListCreateComponent,{
      width:'25%',
      data: element
    }).afterClosed().subscribe(data =>{
        if (data) {
            super.calculateRange();
        }
      })
  }

}
