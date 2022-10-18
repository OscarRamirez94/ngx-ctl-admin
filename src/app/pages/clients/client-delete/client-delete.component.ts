import { Component, Inject, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client/client.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HeadService } from '../../../services/head/head.service';

@Component({
  selector: 'ngx-client-update',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.scss']
})
export class ClientDeleteComponent  extends CommonListComponent<Client, ClientService> implements OnInit{

  contentDelete:string;
  isActive :boolean;
  constructor(
    service: ClientService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
     private  dialogRef: MatDialogRef<ClientDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    headService:HeadService
  ) {
      super(service, router, route,toastrService,headService);
      this.titulo = 'Eliminar Cliente';
      this.model = new Client();
      this.redirect = '/pages/clients/clientes';
      this.nombreModel = "Cliente";
    }

  ngOnInit(): void {
    this.isActive = this.editData.isActive;
    this.contentDelete = this.editData.name;
  }

  deleteClient(){
    this.model.id = this.editData.id;
    super.delete(this.model.id);
    this.dialogRef.close("true");
    super.toast("success","Se elimino correctamente : " + this.contentDelete);
  }










}
