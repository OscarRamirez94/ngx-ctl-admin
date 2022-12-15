import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransportLine } from '../../../models/transport-line/transport-line';
import { HeadService } from '../../../services/head/head.service';
import { TransportLineService } from '../../../services/transport-line/transport-line.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-transport-line-delete',
  templateUrl: './transport-line-delete.component.html',
  styleUrls: ['./transport-line-delete.component.scss']
})
export class TransportLineDeleteComponent extends CommonListComponent<TransportLine, TransportLineService> implements OnInit {

  contentDelete: string;
  isActive: boolean;
  public nombreModel: string="Linea de transporte";
  constructor(
    service: TransportLineService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private dialogRef: MatDialogRef<TransportLineDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    headService:HeadService
  ) {
    super(service, router, route, toastrService,headService);
    this.titulo = 'Eliminar Linea de Transporte';
    this.model = new TransportLine();
    this.redirect = '';
    this.nombreModel = this.nombreModel;
  }

  ngOnInit(): void {
    this.isActive = this.editData.isActive;
    this.contentDelete = this.editData.name;
  }

  deleteTransportLine() {
    this.model.id = this.editData.id;
    super.delete(this.model.id);
    this.dialogRef.close("true");

  }
}
