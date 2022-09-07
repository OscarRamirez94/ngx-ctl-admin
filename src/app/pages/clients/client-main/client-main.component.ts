import {  AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client/client.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
import { ClientCreateComponent } from '../client-create/client-create.component';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'ngx-client-main',
  templateUrl: './client-main.component.html',
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ],
  styleUrls: ['./client-main.component.scss']
})
export class ClientMainComponent extends CommonListComponent<Client,ClientService> implements OnInit,AfterViewInit  {

  animal: string;
  name: string;
  titulo:string = "Clientes";
  newClient:Client;
  //@ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  constructor( service:ClientService,router: Router,
    route: ActivatedRoute,public dialog: MatDialog,toastrService: NbToastrService) {
    super(service,router, route,toastrService);

  }
  ngAfterViewInit() {


  }

  ngOnInit() {
    this.newClient;


  }
  openDialog(): void {

    const dialogRef = this.dialog.open(ClientCreateComponent, {

      width: '65%'

    });

    /*dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closeddd');
      //this.menuTrigger.focus();

    });
    */
  }



}

