import { Component, Inject, OnInit } from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client/client.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../../../models/address/address';
@Component({
  selector: 'ngx-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class ClientUpdateComponent  extends CommonListComponent<Client, ClientService> implements OnInit{

  contentDelete:string;
  isActive :boolean;
  constructor(
    service: ClientService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
     private  dialogRef: MatDialogRef<ClientUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any
  ) {
      super(service, router, route,toastrService);
      this.titulo = 'Agregar Clients';
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
