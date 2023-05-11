import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { CheckList } from '../../../models/check-list/check-list';
import { ResponseCheckList } from '../../../models/check-list/response-check-list';
import { ResponseCheckListService } from '../../../services/check-list/response-check-list.service';
import { HeadService } from '../../../services/head/head.service';
import { CommonResponseCheckList } from '../../commons/common-list/check-list-response.ts/common-response-check-list';
import { CheckListCreateComponent } from '../check-list-create/check-list-create.component';
import { CheckListDeleteComponent } from '../check-list-delete/check-list-delete.component';
import { CheckListPalletValidateComponent } from '../check-list-pallet-validate/check-list-pallet-validate.component';
import { CheckListOpenComponent } from '../check-list-open/check-list-open.component';


@Component({
  selector: 'ngx-check-list-main',
  templateUrl: './check-list-main.component.html',
  styleUrls: ['./check-list-main.component.scss']
})
export class CheckListMainComponent extends CommonResponseCheckList<ResponseCheckList,ResponseCheckListService> {
  hidden = false;
  nbAuthToken:NbAuthToken;
  authorities:any =[];
  isSuper:boolean = false;
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  loading: boolean = true;
  name: string;
  processTypeId:string ="1";
  titulo:string = "Entrada";
  displayedColumns: string[] = ['remision','date','transportLine','transportType','noSello','status','pallets','stock','actions' ];
  clientName =  this.headService.getClientLS();
  constructor( service:ResponseCheckListService,router: Router,route: ActivatedRoute,private dialog: MatDialog,
    toastrService: NbToastrService,
    headService:HeadService,private authService: NbAuthService) {
    super(service,router, route,toastrService,headService);
    this.redirect = '/pages/clients/clientes';
    this.nombreModel = "Entrada";
    this.authService.onTokenChange().subscribe(data =>{
      this.authorities = data.getPayload()['authorities']
  })
  if (this.hasRole(['ROLE_SUPER'])){
    this.isSuper = true;
  };
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

  deleteRemision(element:any){
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
    this.dialog.open(CheckListPalletValidateComponent,{

      data: element
    }).afterClosed().subscribe(data =>{
        if (data) {
          this.service.updateStatus(element.id).subscribe(data =>{
            super.toast("success","Se finalizó la remision con éxito: " + element.remision)
            super.calculateRange(this.clientName);
          });
        }
      })
  }

  openRemision(element:any){
    this.dialog.open(CheckListOpenComponent,{

      data: element
    }).afterClosed().subscribe(data =>{
        if (data) {
          this.service.openStatus(element.id).subscribe(data =>{
            super.toast("success","Se modificó el estatus a open con éxito: " + element.remision)
            super.calculateRange(this.clientName);
          });
        }
      })
  }
  hasRole(roles:String[]):Boolean{
    return roles.some(r=> this.authorities.includes(r));
 }

}
