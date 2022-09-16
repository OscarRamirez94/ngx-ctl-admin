import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransportCapacity } from '../../../models/transport_capacity/transport-capacity';
import { TransportCapacityService } from '../../../services/transport-capacity/transport-capacity.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
import { TransportCapacityCreateComponent } from '../transport-capacity-create/transport-capacity-create.component';
import { TransportCapacityDeleteComponent } from '../transport-capacity-delete/transport-capacity-delete.component';

@Component({
  selector: 'ngx-transport-capacity-main',
  templateUrl: './transport-capacity-main.component.html',
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } }
  ],
  styleUrls: ['./transport-capacity-main.component.scss']
})
export class TransportCapacityMainComponent extends CommonListComponent<TransportCapacity, TransportCapacityService>{

name: string;
  titulo: string = "Capacidad de Transporte";
  displayedColumns: string[] = ['id', 'capacity', 'unity','isActive', 'actions'];
  constructor(service: TransportCapacityService, router: Router, route: ActivatedRoute, private dialog: MatDialog, toastrService: NbToastrService) {
    super(service, router, route, toastrService);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TransportCapacityCreateComponent, {
      width: '35%'
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    });
  }

  editarTransportCapacity(element: any) {

    this.dialog.open(TransportCapacityCreateComponent, {
      width: '35%',
      data: element,

    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })
  }

  deleteTransportCapacity(element: any) {
    this.dialog.open(TransportCapacityDeleteComponent, {
      width: '25%',
      data: element
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })
  }

}
