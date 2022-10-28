import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransportCapacity } from '../../../models/transport_capacity/transport-capacity';
import { HeadService } from '../../../services/head/head.service';
import { TransportCapacityService } from '../../../services/transport-capacity/transport-capacity.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-transport-type-capacity-delete',
  templateUrl: './transport-type-capacity-delete.component.html',
  styleUrls: ['./transport-type-capacity-delete.component.scss']
})
export class TransportTypeCapacityDeleteComponent extends CommonListComponent<TransportCapacity, TransportCapacityService> implements OnInit {

  contentDelete: string;
  isActive: boolean;
  public nombreModel: string="Capacidad de transporte";
  constructor(
    service: TransportCapacityService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private dialogRef: MatDialogRef<TransportTypeCapacityDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    headService:HeadService
  ) {
    super(service, router, route, toastrService,headService);
    this.titulo = 'Eliminar Capacidad de Transporte';
    this.model = new TransportCapacity();
    this.redirect = '';
    this.nombreModel = this.nombreModel;
  }

  ngOnInit(): void {

  }

  deleteTransportCapacity() {
    this.model.id = this.editData.id;
    super.delete(this.model.id);
    this.dialogRef.close("true");
    super.toast("success", "Se elimino correctamente : " + this.editData.capacity  + this.editData.unity);
  }
}