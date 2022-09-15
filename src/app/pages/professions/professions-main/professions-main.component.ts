import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Profession } from '../../../models/profession/profession';
import { ProfessionService } from '../../../services/profession/profession.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
import { ProfessionsCreateComponent } from '../professions-create/professions-create.component';
import { ProfessionsDeleteComponent } from '../professions-delete/professions-delete.component';

@Component({
  selector: 'ngx-professions-main',
  templateUrl: './professions-main.component.html',
  //Se inyecta el default para los mat inputs
  //floatLabel(Etiqueta)
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } }
  ],
  styleUrls: ['./professions-main.component.scss']
})

/*Segundo paso se agrego "extends CommonListComponent<Profession, ProfessionService> 
va  por  un service generico 
---CommonListComponent  trae la funcionalidad de l paginator, refrescar, buscador, order by 
*/
export class ProfessionsMainComponent extends CommonListComponent<Profession, ProfessionService> {

  name: string;
  titulo: string = "Profesiones";
  displayedColumns: string[] = ['id', 'name', 'isActive', 'actions'];
  //Se inyectan  objetos erados por el padre 
  constructor(service: ProfessionService, router: Router, route: ActivatedRoute, private dialog: MatDialog, toastrService: NbToastrService) {
    //Super es el cnstructor  o el accdeso ala clase abstracta.
    super(service, router, route, toastrService);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProfessionsCreateComponent, {
      width: '65%'
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    });
  }

  editarClient(element: any) {

    this.dialog.open(ProfessionsCreateComponent, {
      width: '65%',
      data: element,

    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })
  }

  deleteClient(element: any) {
    this.dialog.open(ProfessionsDeleteComponent, {
      width: '25%',
      data: element
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })
  }
}
