import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Profession } from '../../../models/profession/profession';
import { HeadService } from '../../../services/head/head.service';
import { ProfessionService } from '../../../services/profession/profession.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-profession-delete',
  templateUrl: './profession-delete.component.html',
  styleUrls: ['./profession-delete.component.scss']
})
export class ProfessionDeleteComponent extends CommonListComponent<Profession, ProfessionService> implements OnInit {

  contentDelete: string;
  isActive: boolean;
  public nombreModel: string="Puesto";
  constructor(
    service: ProfessionService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private dialogRef: MatDialogRef<ProfessionDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    headService:HeadService
  ) {
    super(service, router, route, toastrService,headService);
    this.titulo = 'Agregar Puesto';
    this.model = new Profession();
    this.redirect = '';
    this.nombreModel = this.nombreModel;
  }

  ngOnInit(): void {
    this.isActive = this.editData.isActive;
    this.contentDelete = this.editData.name;
  }

  deleteClient() {
    this.model.id = this.editData.id;
    super.delete(this.model.id);
    this.dialogRef.close("true");
  }


}
