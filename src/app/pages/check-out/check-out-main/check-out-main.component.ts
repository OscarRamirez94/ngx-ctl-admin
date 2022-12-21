import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { CheckOut } from '../../../models/check-out/check-out';
import { CheckOutService } from '../../../services/check-out/check-out.service';
import { HeadService } from '../../../services/head/head.service';
import { CommonListCheckComponent } from '../../commons/common-list/common-list.component-check';
import { CheckOutCreateComponent } from '../check-out-create/check-out-create.component';
import { CheckOutDeleteComponent } from '../check-out-delete/check-out-delete.component';

@Component({
  selector: 'ngx-check-out-main',
  templateUrl: './check-out-main.component.html',
  styleUrls: ['./check-out-main.component.scss']
})
export class CheckOutMainComponent  extends CommonListCheckComponent<CheckOut,CheckOutService> {
  hidden = false;
  nbAuthToken:NbAuthToken;
  authorities:any =[];
  isSuper:boolean = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  processTypeId:string ="2";
  name: string;
  titulo:string = "Salida";
  displayedColumns: string[] = ['remision','date','transportLine','transportType','noSello','status','actions' ];
  clientName =  this.headService.getClientLS();
  constructor( service:CheckOutService,router: Router,route: ActivatedRoute,private dialog: MatDialog,
    toastrService: NbToastrService,
    headService:HeadService,private authService: NbAuthService) {
    super(service,router, route,toastrService,headService);
    this.redirect = '/pages/clients/clientes';
    this.nombreModel = "Salida";
    this.authService.onTokenChange().subscribe(data =>{
      this.authorities = data.getPayload()['authorities']
  });
  if (this.hasRole(['ROLE_SUPER'])){
    this.isSuper = true;
  };
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
    this.router.navigate(['pages/checkout/pallet-main-test/' + element.id + '/' + element.remision]);
  }

  viewRemision(element:CheckOut): void {
    //this.router.navigate(['pages/checklist/pallet-main/' + element.id]);
    this.router.navigate(['pages/checkout/pallet-view/' + element.id]);
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
  hasRole(roles:String[]):Boolean{
    return roles.some(r=> this.authorities.includes(r));
 }
}
