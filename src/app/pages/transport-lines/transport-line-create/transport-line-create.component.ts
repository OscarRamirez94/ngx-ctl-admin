import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransportLine } from '../../../models/transport-line/transport-line';
import { TransportLineService } from '../../../services/transport-line/transport-line.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-transport-line-create',
  templateUrl: './transport-line-create.component.html',
  styleUrls: ['./transport-line-create.component.scss']
})
export class TransportLineCreateComponent extends CommonListComponent<TransportLine, TransportLineService> implements OnInit {
  transportLineForm !: FormGroup;
  submitted = false;
  actionBtn: String = "Crear";
  isChecked;
  constructor(
    service: TransportLineService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private formBuilder: FormBuilder, private dialogRef: MatDialogRef<TransportLineCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    super(service, router, route, toastrService);
    this.titulo = 'Agregar Linea de Transporte';
    this.model = new TransportLine();
    this.redirect = '';
    this.nombreModel = "TransportLine";
  }

  ngOnInit(): void {
    this.setForm();
    this.rejectForm(this.editData);
    super.paginator;
  }

  get f() { return this.transportLineForm.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.transportLineForm.invalid) {
      return;
    }
    if (!this.editData) {
      this.modeltransportLine(this.transportLineForm);
      super.crear();
      this.onReset();
      super.toast("success", "Profesion creada con éxito");
    } else {
      this.editarTransportLine();
    }
  }

  onReset() {
    this.submitted = false;
    this.transportLineForm.reset();
    this.editData = null;
    this.dialogRef.close("true");
  }

  setForm() {
    this.transportLineForm = this.formBuilder.group({
      name: ['', Validators.required],
      isActive: ['', Validators.required],
    });
  }

  rejectForm(editData: any) {
    if (editData) {
      this.actionBtn = "Modificar";
      this.titulo ="Modificar Transporte de Linea"
      this.transportLineForm.controls['name'].setValue(editData.name);
      this.transportLineForm.controls['isActive'].setValue(editData.isActive);
      this.model.id = editData.id;
      this.isChecked = editData.isActive;
    }
  }
  editarTransportLine() {
    this.modeltransportLine(this.transportLineForm);
    super.editar();
    this.onReset();
    super.toast("success", "Modificado  con éxito");
  }

  modeltransportLine(transportLineForm: any) {
    this.model.name = transportLineForm.get('name').value;
    this.model.isActive = transportLineForm.get('isActive').value;
  }
}
