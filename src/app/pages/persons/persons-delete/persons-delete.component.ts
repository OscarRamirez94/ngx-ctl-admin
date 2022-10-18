import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Person } from '../../../models/person/person';
import { HeadService } from '../../../services/head/head.service';
import { PersonService } from '../../../services/person/person.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-persons-delete',
  templateUrl: './persons-delete.component.html',
  styleUrls: ['./persons-delete.component.scss']
})
export class PersonsDeleteComponent  extends CommonListComponent<Person, PersonService> implements OnInit {

  contentDelete: string;
  isActive: boolean;
  public nombreModel: string="Profesion";
  constructor(
    service: PersonService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private dialogRef: MatDialogRef<PersonsDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    headService:HeadService
  ) {
    super(service, router, route, toastrService,headService);
    this.titulo = 'Agregar profesion';
    this.model = new Person();
    this.redirect = '';
    this.nombreModel = this.nombreModel;
  }

  ngOnInit(): void {
    this.isActive = this.editData.isActive;
    this.contentDelete = this.editData.firstName;
  }

  deleteClient() {
    this.model.id = this.editData.id;
    super.delete(this.model.id);
    this.dialogRef.close("true");
    super.toast("success", "Se elimino correctamente : " + this.contentDelete);
  }


}
