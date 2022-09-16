import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransportType } from '../../../models/transport_type/transport-type';
import { TransportTypeService } from '../../../services/transport-type/transport-type.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-transport-type-delete',
  templateUrl: './transport-type-delete.component.html',
  styleUrls: ['./transport-type-delete.component.scss']
})
export class TransportTypeDeleteComponent  extends CommonListComponent<TransportType, TransportTypeService> implements OnInit {

  contentDelete: string;
  isActive: boolean;
  public nombreModel: string="Tipo de transporte";
  isById = false;
  constructor(
    service: TransportTypeService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private dialogRef: MatDialogRef<TransportTypeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    super(service, router, route, toastrService);
    this.titulo = 'Eliminar Linea de Transporte';
    this.model = new TransportType();
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
    super.toast("success", "Se elimino correctamente : " + this.contentDelete);
  }
}
