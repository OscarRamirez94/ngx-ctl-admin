import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransportLine } from '../../../models/transport-line/transport-line';
import { TransportLineService } from '../../../services/transport-line/transport-line.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
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
export class TransportLineMainComponent extends CommonListComponent<TransportLine, TransportLineService>  {


  name: string;
  titulo: string = "Lineas de Transporte";
  displayedColumns: string[] = ['id', 'name', 'isActive', 'actions'];
  constructor(service: TransportLineService, router: Router, route: ActivatedRoute, private dialog: MatDialog, toastrService: NbToastrService) {
    super(service, router, route, toastrService);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TransportLineCreateComponent, {
      width: '35%'
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    });
  }

  editarTransportLine(element: any) {

    this.dialog.open(TransportLineCreateComponent, {
      width: '35%',
      data: element,

    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })
  }

  deleteTransportLine(element: any) {
    this.dialog.open(TransportLineDeleteComponent, {
      width: '25%',
      data: element
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })
  }

}