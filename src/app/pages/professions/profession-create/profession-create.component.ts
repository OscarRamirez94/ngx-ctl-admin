import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Profession } from '../../../models/profession/profession';
import { HeadService } from '../../../services/head/head.service';
import { ProfessionService } from '../../../services/profession/profession.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-profession-create',
  templateUrl: './profession-create.component.html',
  styleUrls: ['./profession-create.component.scss']
})
//ONIT: es el  primer  metodo de carga en el ciclo de vida de un componente de angular sin realizar  una ejeuciòn
export class ProfessionCreateComponent extends CommonListComponent<Profession, ProfessionService> implements OnInit {
  professionForm !: FormGroup;
  submitted = false;
  actionBtn: String = "Crear";
  isChecked;
  constructor(
    service: ProfessionService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ProfessionCreateComponent>,
    //Es para inyectar data de  un modelo a  un dialogo
    @Inject(MAT_DIALOG_DATA) public editData: any,
    headService:HeadService
  ) {
    super(service, router, route, toastrService,headService);
    this.titulo = 'Agregar Profesion';
    this.model = new Profession();
    this.redirect = '';
    this.nombreModel = "Profesion";
  }

  ngOnInit(): void {
    console.log('Prueba de onINIT');
    console.log(this.editData + "data");
    this.setForm();

    this.rejectForm(this.editData);
    super.paginator;
  }

  get f() { return this.professionForm.controls; }

  //Primer paso
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    console.log("form", this.professionForm.value)
    if (this.professionForm.invalid) {
      return;
    }
    if (!this.editData) {
      console.log("form", this.professionForm.value)
      this.modelClient(this.professionForm);
      super.crear();
      this.onReset();
      super.toast("success", "Profesion creada con éxito");
    } else {
      this.editarClient();
    }
  }

  onReset() {
    this.submitted = false;
    this.professionForm.reset();
    this.editData = null;
    this.dialogRef.close("true");
  }
//Se declara los campos usados en el formulario.
//Nota: aqui sevan agrgeagndo los campos necesarios de  mi formulario
//formBuilder  objeto que guarda los campos
//Validators: tipos de validaciones " ctrl + click para ver  ""
  setForm() {
    this.professionForm = this.formBuilder.group({
      name: ['', Validators.required],
      isActive: ['', Validators.required],
    });
  }

  //Recibe objeto del dialog o  modal  en edit  data y se setea  el formulario  con sus valores
  //esto hace que los pinte los datos al formulario.
  rejectForm(editData: any) {
    if (editData) {
      this.actionBtn = "Modificar";
      this.professionForm.controls['name'].setValue(editData.name);
      this.professionForm.controls['isActive'].setValue(editData.isActive);
      this.model.id = editData.id;
      this.isChecked = editData.isActive;
    }
  }


  editarClient() {
    this.modelClient(this.professionForm);
    super.editar();
    this.onReset();
    super.toast("success", "Modificado  con éxito");
  }

  //Se setean  los  datos cargados del  formulario al  objeto de  modificar  al  modelo
  modelClient(professionForm: any) {
    this.model.name = professionForm.get('name').value;
    this.model.isActive = professionForm.get('isActive').value;
  }

}
