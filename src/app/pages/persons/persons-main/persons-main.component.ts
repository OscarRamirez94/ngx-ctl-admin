import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Person } from '../../../models/person/person';
import { HeadService } from '../../../services/head/head.service';
import { PersonService } from '../../../services/person/person.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
import { PersonsCreateComponent } from '../persons-create/persons-create.component';
import { PersonsDeleteComponent } from '../persons-delete/persons-delete.component';

@Component({
  selector: 'ngx-persons-main',
  templateUrl: './persons-main.component.html',
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } }
  ],
  styleUrls: ['./persons-main.component.scss']
})
export class PersonsMainComponent extends CommonListComponent<Person, PersonService> {

  name: string;
  titulo: string = "Personas";
  displayedColumns: string[] = ['id', 'firstName', 'additionalName', 'lastName', 'secondName', 'isActive', 'actions'];
  constructor(service: PersonService, router: Router, route: ActivatedRoute,
    private dialog: MatDialog, toastrService: NbToastrService,headService:HeadService) {
    super(service, router, route, toastrService,headService);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PersonsCreateComponent, {
      width: '65%'
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    });
  }

  editarClient(element: any) {
    this.dialog.open(PersonsCreateComponent, {
      width: '65%',
      data: element


    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })
  }

  deleteClient(element: any) {
    this.dialog.open(PersonsDeleteComponent, {
      width: '25%',
      data: element
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })
  }
}
