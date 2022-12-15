import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { map, Observable, startWith } from 'rxjs';
import { ProfessionI } from '../../../interfaces/profession-i';
import { Person } from '../../../models/person/person';
import { Profession } from '../../../models/profession/profession';
import { HeadService } from '../../../services/head/head.service';
import { PersonService } from '../../../services/person/person.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-persons-create',
  templateUrl: './persons-create.component.html',
  styleUrls: ['./persons-create.component.scss']
})


export class PersonsCreateComponent extends CommonListComponent<Person, PersonService> implements OnInit {





  PersonForm !: FormGroup;
  submitted = false;
  actionBtn: String = "Crear";
  isChecked;

  //esta es la que va al html con datos que la setteas del data del serviecs
  professions: ProfessionI[];
  constructor(
    service: PersonService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private formBuilder: FormBuilder, private dialogRef: MatDialogRef<PersonsCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    headService:HeadService
  ) {
    super(service, router, route, toastrService,headService);
    this.titulo = 'Agregar Clients';
    this.model = new Person();
    this.model.profession = new Profession();
    this.redirect = '/pages/clients/clientes';
    this.nombreModel = "Cliente";
  }


  ngOnInit(): void {
    this.setForm();
    this.rejectForm(this.editData);
    super.paginator;
    // se manda a llamarel metodo creado
    //este es el de abajo
    this.getAllProfessions();

  }

  get f() { return this.PersonForm.controls; }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid

    if (this.PersonForm.invalid) {
      return;
    }
    if (!this.editData) {

      this.modelClient(this.PersonForm);
      super.crear();
      this.onReset();
      super.toast("success", "Personal creado con éxito");
    } else {
      this.editarClient();
    }
  }

  onReset() {
    this.submitted = false;
    this.PersonForm.reset();
    this.editData = null;
    this.dialogRef.close("true");
  }

  setForm() {
    //Setaear aqui siempre  los campos
    // aqui esta el error ah ya  vi  me  falta  mandar ataraer los demas campos verdad?
    this.PersonForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      additionalName: [''],
      lastName: ['', Validators.required],
      secondName: ['', Validators.required],
      isActive: ['', Validators.required],
      profession: ['', Validators.required],
    });
  }

  rejectForm(editData: any) {
    if (editData) {
      this.actionBtn = "Modificar";
      // si solo aqui estos valores son estos
      this.PersonForm.controls['firstName'].setValue(editData.firstName);
      this.PersonForm.controls['additionalName'].setValue(editData.additionalName);
      this.PersonForm.controls['lastName'].setValue(editData.lastName);
      this.PersonForm.controls['secondName'].setValue(editData.secondName);
      this.PersonForm.controls['isActive'].setValue(editData.isActive);
      this.model.id = editData.id;
      this.isChecked = editData.isActive;
      this.PersonForm.controls['profession'].setValue(editData.profession);
      this.model.profession.id=editData.profession.id;
    }
  }

  editarClient() {
    this.modelClient(this.PersonForm);
    super.editar();
    this.onReset();
    super.toast("success", "Personal modificado con éxito");
  }

  //Setaear aqui siempre  los campos
  modelClient(PersonForm: any) {
    // el 2 creo no existe
    //this.model.profession.id = 5;
    this.model.firstName = PersonForm.get('firstName').value,
      this.model.additionalName = PersonForm.get('additionalName').value,
      this.model.lastName = PersonForm.get('lastName').value,
      this.model.secondName = PersonForm.get('secondName').value,
      this.model.isActive = PersonForm.get('isActive').value;
  }

  // este metodo manda a llamar el metodo del service this.service.getAllProfessions
  // el subscribe obtiene la data que es la interface que realizaste
  // la obtiene y la va a guardar en this.professions que aun no existe, hay que declararla como profession:ProfessionI[]; hasta arriba
  getAllProfessions() {
    this.service.getAllProfessions().subscribe(data => {

      this.professions = data;

    })
  }

  optionSelected(event: any) {
    this.model.profession.id = event.id;


  }
  public displayProperty(value) {

    if (value) {
      return value.name;
    }
  }

}
