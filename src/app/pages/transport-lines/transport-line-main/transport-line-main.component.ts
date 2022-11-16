import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransportLine } from '../../../models/transport-line/transport-line';
import { HeadService } from '../../../services/head/head.service';
import { TransportLineService } from '../../../services/transport-line/transport-line.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
import { CommonListClientComponent } from '../../commons/common-list/common-list.component-client';
import { TransportLineCreateComponent } from '../transport-line-create/transport-line-create.component';
import { TransportLineDeleteComponent } from '../transport-line-delete/transport-line-delete.component';

@Component({
  selector: 'ngx-transport-line-main',
  templateUrl: './transport-line-main.component.html',
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } }
  ],
  styleUrls: ['./transport-line-main.component.scss']
})
export class TransportLineMainComponent extends CommonListClientComponent<TransportLine, TransportLineService> implements OnInit  {


  name: string;
  titulo: string = "Lineas de Transporte";
  displayedColumns: string[] = ['name','partner', 'isActive', 'actions'];
  clientName =  this.headService.getClientLS();

  constructor(service: TransportLineService, router: Router, route: ActivatedRoute,
     private dialog: MatDialog, toastrService: NbToastrService,
     headService:HeadService) {
    super(service, router, route, toastrService,headService);
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(TransportLineCreateComponent, {
      width: '35%'
    }).afterClosed().subscribe(data => {

      if (data) {
        super.calculateRange(this.clientName);
      }
    });
  }

  editarTransportLine(element: any) {

    this.dialog.open(TransportLineCreateComponent, {
      width: '35%',
      data: element,

    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange(this.clientName);
      }
    })
  }

  deleteTransportLine(element: any) {
    this.dialog.open(TransportLineDeleteComponent, {
      width: '25%',
      data: element
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange(this.clientName);
      }
    })
  }

}
