import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CheckList } from '../../../models/check-list/check-list';
import { CheckListService } from '../../../services/check-list/check-list.service';
import { HeadService } from '../../../services/head/head.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-check-list-delete',
  templateUrl: './check-list-delete.component.html',
  styleUrls: ['./check-list-delete.component.scss']
})
export class CheckListDeleteComponent extends CommonListComponent<CheckList, CheckListService> implements OnInit{

  contentDelete:string;
  isActive :boolean;
  constructor(
    service: CheckListService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
     private  dialogRef: MatDialogRef<CheckListDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    headService:HeadService
  ) {
      super(service, router, route,toastrService,headService);
      this.titulo = 'Eliminar Remision';
      this.model = new CheckList();
      this.redirect = '/pages/clients/clientes';
      this.nombreModel = "Registro";
    }

  ngOnInit(): void {

    this.contentDelete = this.editData.remision;
  }

  deleteClient(){
    this.model.id = this.editData.id;
    super.delete(this.model.id);
    this.dialogRef.close("true");

  }










}
