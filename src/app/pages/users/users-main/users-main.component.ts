import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { User } from '../../../models/user/user';
import { HeadService } from '../../../services/head/head.service';
import { UserService } from '../../../services/user/user.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
import { UserCreateComponent } from '../users-create/users-create.component';
import { UsersDeleteComponent } from '../users-delete/users-delete.component';

@Component({
  selector: 'ngx-users-main',
  templateUrl: './users-main.component.html',
  //Se inyecta el default para los mat inputs
  //floatLabel(Etiqueta)
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } }
  ],
  styleUrls: ['./users-main.component.scss']
})

export class UsersMainComponent extends CommonListComponent<User, UserService> {
  name: string;
  titulo: string = "Usuarios";
  displayedColumns: string[] = ['id', 'firstName','username', 'additionalName',  'isActive','isResponsible', 'actions'];



  constructor(service: UserService, router: Router, route: ActivatedRoute,
    private dialog: MatDialog, toastrService: NbToastrService,
    headService:HeadService) {
    super(service, router, route, toastrService,headService);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '65%'
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    });
  }

  editarClient(element: any) {

    this.dialog.open(UserCreateComponent, {
      width: '65%',
      data: element,

    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })
  }

  deleteClient(element: any) {
    this.dialog.open(UsersDeleteComponent, {
      width: '25%',
      data: element
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })
  }
}
