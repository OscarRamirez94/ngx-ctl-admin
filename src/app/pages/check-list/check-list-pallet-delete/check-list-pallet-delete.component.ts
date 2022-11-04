import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Client } from '../../../models/client';
import { Pallet } from '../../../models/pallet/pallet';
import { HeadService } from '../../../services/head/head.service';
import { PalletService } from '../../../services/pallet/pallet.service';
import { ClientDeleteComponent } from '../../clients/client-delete/client-delete.component';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-check-list-pallet-delete',
  templateUrl: './check-list-pallet-delete.component.html',
  styleUrls: ['./check-list-pallet-delete.component.scss']
})
export class CheckListPalletDeleteComponent  extends CommonListComponent<Pallet, PalletService> implements OnInit{

  contentDelete:string;
  isActive :boolean;
  constructor(
    service: PalletService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
     private  dialogRef: MatDialogRef<ClientDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    headService:HeadService
  ) {
      super(service, router, route,toastrService,headService);
      this.titulo = 'Eliminar Pallet';
      this.model = new Pallet();
      this.redirect = '/pages/clients/clientes';
      this.nombreModel = "Pallet";
    }

  ngOnInit(): void {
    this.isActive = this.editData.isActive;
    this.contentDelete = this.editData.ua;
  }

  deleteClient(){
    this.model.id = this.editData.id;
    super.delete(this.model.id);
    this.dialogRef.close("true");
    super.toast("success","Se elimino correctamente : " + this.contentDelete);
  }

}
