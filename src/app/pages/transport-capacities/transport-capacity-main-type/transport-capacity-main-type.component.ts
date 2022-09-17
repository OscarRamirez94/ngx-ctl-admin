import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransportCapacity } from '../../../models/transport_capacity/transport-capacity';
import { TransportCapacityService } from '../../../services/transport-capacity/transport-capacity.service';
import { CommonListIdComponent } from '../../commons/common-list/common-list-id.component';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-transport-capacity-main-type',
  templateUrl: './transport-capacity-main-type.component.html',
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } }
  ],
  styleUrls: ['./transport-capacity-main-type.component.scss']
})
export class TransportCapacityMainTypeComponent extends CommonListIdComponent<TransportCapacity, TransportCapacityService> {

  name: string;
  titulo: string = "Capacidad de Transporte";
  displayedColumns: string[] = ['id', 'capacity', 'unity','isActive'];
  constructor(service: TransportCapacityService, router: Router, route: ActivatedRoute, private dialog: MatDialog,
    toastrService: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public editData: any) {
    super(service, router, route, toastrService);
    this.model = new TransportCapacity();
    this.model.id = editData.id;
  }

}
