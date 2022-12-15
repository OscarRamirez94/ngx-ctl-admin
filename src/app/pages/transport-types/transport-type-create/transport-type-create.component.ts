import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransportType } from '../../../models/transport_type/transport-type';
import { HeadService } from '../../../services/head/head.service';
import { TransportTypeService } from '../../../services/transport-type/transport-type.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-transport-type-create',
  templateUrl: './transport-type-create.component.html',
  styleUrls: ['./transport-type-create.component.scss']
})
export class TransportTypeCreateComponent extends CommonListComponent<TransportType, TransportTypeService> implements OnInit {

  transportTypeForm !: FormGroup;
  submitted = false;
  actionBtn: String = "Crear";
  isChecked;
  isById = false;
  constructor(
    service: TransportTypeService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private formBuilder: FormBuilder, private dialogRef: MatDialogRef<TransportTypeCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    headService:HeadService
  ) {
    super(service, router, route, toastrService,headService);
    this.titulo = 'Tipo de Transporte';
    this.model = new TransportType();
    this.redirect = '';
    this.nombreModel = "Tipo de transporte";
  }

  ngOnInit(): void {
    this.setForm();
    this.rejectForm(this.editData);
    super.paginator;
  }

  get f() { return this.transportTypeForm.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.transportTypeForm.invalid) {
      return;
    }
    if (!this.editData) {
      this.modelTransportType(this.transportTypeForm);
      super.crear();
      this.onReset();
    } else {
      this.editarTransportType();
    }
  }

  onReset() {
    this.submitted = false;
    this.transportTypeForm.reset();
    this.editData = null;
    this.dialogRef.close("true");
  }

  setForm() {
    this.transportTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
      isActive: ['', Validators.required],
    });
  }

  rejectForm(editData: any) {
    if (editData) {
      this.actionBtn = "Modificar";

      this.transportTypeForm.controls['name'].setValue(editData.name);
      this.transportTypeForm.controls['isActive'].setValue(editData.isActive);
      this.model.id = editData.id;
      this.isChecked = editData.isActive;
    }
  }
  editarTransportType() {
    this.modelTransportType(this.transportTypeForm);
    super.editar();
    this.onReset();
    super.toast("success", "Tipo de transporte modificado  con éxito");
  }

  modelTransportType(transportLineForm: any) {
    this.model.name = transportLineForm.get('name').value;
    this.model.isActive = transportLineForm.get('isActive').value;
  }
}
