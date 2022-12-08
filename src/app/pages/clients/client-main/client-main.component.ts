import { Component, Input, ViewChild} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { HeaderComponent } from '../../../@theme/components';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client/client.service';
import { HeadService } from '../../../services/head/head.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
import { ClientCreateComponent } from '../client-create/client-create.component';
import { ClientDeleteComponent } from '../client-delete/client-delete.component';

@Component({
  selector: 'ngx-client-main',
  templateUrl: './client-main.component.html',
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ],
  styleUrls: ['./client-main.component.scss']
})

export class ClientMainComponent extends CommonListComponent<Client,ClientService>   {
  name: string;
  titulo:string = "Clientes";
  displayedColumns: string[] = ['name','direccion','isActive','actions'];

  constructor( service:ClientService,router: Router,route: ActivatedRoute,
    private dialog: MatDialog,toastrService: NbToastrService,
    headService:HeadService) {
    super(service,router, route,toastrService,headService);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientCreateComponent, {
      width: '65%'
    }).afterClosed().subscribe(data =>{
        if (data) {
          super.calculateRange();
          this.headService.disparadorClients.emit(true);
        }
      });
  }

  editarClient(element:any){
    this.dialog.open(ClientCreateComponent,{
      width:'65%',
      data: element
    }).afterClosed().subscribe(data =>{
        if (data) {
            super.calculateRange();
            this.headService.disparadorClients.emit(true);
        }
      })
  }

  deleteClient(element:any){
    this.dialog.open(ClientDeleteComponent,{
      width:'25%',
      data: element
    }).afterClosed().subscribe(data =>{
        if (data) {
            super.calculateRange();

        }
      })
  }
}
