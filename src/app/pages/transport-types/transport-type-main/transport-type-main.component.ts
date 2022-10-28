import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransportType } from '../../../models/transport_type/transport-type';
import { HeadService } from '../../../services/head/head.service';
import { TransportTypeService } from '../../../services/transport-type/transport-type.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
import { TransportCapacityCreateComponent } from '../../transport-capacities/transport-capacity-create/transport-capacity-create.component';
import { TransportCapacityMainTypeComponent } from '../../transport-capacities/transport-capacity-main-type/transport-capacity-main-type.component';
import { TransportTypeCreateComponent } from '../transport-type-create/transport-type-create.component';
import { TransportTypeDeleteComponent } from '../transport-type-delete/transport-type-delete.component';

@Component({
  selector: 'ngx-transport-type-main',
  templateUrl: './transport-type-main.component.html',
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } }
  ],
  styleUrls: ['./transport-type-main.component.scss']
})
export class TransportTypeMainComponent extends CommonListComponent<TransportType, TransportTypeService>   {

  name: string;
  titulo: string = "Lineas de Transporte";
  showTable:boolean = false;
  isById = false;

  displayedColumns: string[] = ['id', 'name', 'isActive','capacities', 'actions'];
  constructor(service: TransportTypeService, router: Router, route: ActivatedRoute,
    private dialog: MatDialog, toastrService: NbToastrService,
    headService:HeadService) {

    super(service, router, route, toastrService,headService);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TransportTypeCreateComponent, {
      width: '35%'
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    });
  }

  editarTransportType(element: any) {

    this.dialog.open(TransportTypeCreateComponent, {
      width: '35%',
      data: element
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })
  }

  deleteTransportType(element: any) {
    this.dialog.open(TransportTypeDeleteComponent, {
      width: '25%',
      data: element
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })
  }

  showCapacities(element: any) {
    this.router.navigate(['pages/transport-types/capacity/' + element.id]);
    /*this.dialog.open(TransportCapacityMainTypeComponent, {
      width: '85%',
      height:'85%',
      data: element
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })*/
  }


}
