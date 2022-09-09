import { Component} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client/client.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
import { ClientCreateComponent } from '../client-create/client-create.component';
import { ClientUpdateComponent } from '../client-update/client-update.component';
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
  displayedColumns: string[] = ['id', 'name','isActive','actions'];

  constructor( service:ClientService,router: Router,route: ActivatedRoute,private dialog: MatDialog,toastrService: NbToastrService) {
    super(service,router, route,toastrService);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientCreateComponent, {
      width: '65%'
    }).afterClosed().subscribe(data =>{
      if (data) {
        super.calculateRange();
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
        }
      })
  }

  deleteClient(element:any){
    this.dialog.open(ClientUpdateComponent,{
      width:'25%',
      data: element
    }).afterClosed().subscribe(data =>{
        if (data) {
            super.calculateRange();
        }
      })
  }
}
