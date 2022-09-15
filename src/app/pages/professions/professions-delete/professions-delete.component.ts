import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Profession } from '../../../models/profession/profession';
import { ClientService } from '../../../services/client/client.service';
import { ProfessionService } from '../../../services/profession/profession.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-professions-delete',
  templateUrl: './professions-delete.component.html',
  styleUrls: ['./professions-delete.component.scss']
})
export class ProfessionsDeleteComponent extends CommonListComponent<Profession, ProfessionService> implements OnInit {

  contentDelete: string;
  isActive: boolean;
  public nombreModel: string="Profesion";
  constructor(
    service: ProfessionService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private dialogRef: MatDialogRef<ProfessionsDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    super(service, router, route, toastrService);
    this.titulo = 'Agregar profesion';
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
    super.toast("success", "Se elimino correctamente : " + this.contentDelete);
  }


}
