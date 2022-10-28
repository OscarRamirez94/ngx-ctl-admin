import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Professionl } from '../../../interfaces/profession-i';
import { Profession } from '../../../models/profession/profession';
import { UserPost } from '../../../models/user/user-post';
import { HeadService } from '../../../services/head/head.service';
import { UserPostService } from '../../../services/user/user-post.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})

export class UserCreateComponent extends CommonListComponent<UserPost, UserPostService> implements OnInit {
  professions: Professionl[];
  userForm !: FormGroup;
  submitted = false;
  actionBtn: String = "Crear";
  isChecked;
  isResponsible;
  roleList: string[] = ['ROLE_ADMIN', 'ROLE_USERS', 'ROLE_SUPER'];
  selectedOptions: string[] = [];
  loading = false;


  constructor(
    service: UserPostService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private formBuilder: FormBuilder, private dialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: UserPost,
    headService:HeadService
  ) {
    super(service, router, route, toastrService,headService);
    this.model = new UserPost();
    this.model.profession = new Profession();
    this.titulo = 'Agregar Clients';

    this.redirect = '/pages/clients/clientes';
    this.nombreModel = "Cliente";

  }

  ngOnInit(): void {
    this.getAllProfessions();
    this.setForm();
    this.rejectForm(this.editData);
    super.paginator;
  }

  get f() { return this.userForm.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }
    this.loading = true;
    if (!this.editData) {

      this.modelClient(this.userForm);
      super.crear().subscribe(data =>{
        if (data){
          this.onReset();
          super.toast("success", "Usuario creado con éxito");
          this.loading = false;
        }
      });

    } else {
      this.editarClient();
    }

  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
    this.editData = null;
    this.dialogRef.close("true");
  }

  setForm() {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      additionalName: [''],
      lastName: ['', Validators.required],
      secondName: ['', Validators.required],
      isActive: ['', Validators.required],
      roles: ['', Validators.required],
      isResponsible: ['', Validators.required],
      profession: ['', Validators.required],

    });
  }

  rejectForm(editData: UserPost) {
    if (editData) {
      console.log("lista roles", editData.roles)
      this.actionBtn = "Modificar";

      this.userForm.controls['email'].setValue(editData.email);
      this.userForm.controls['firstName'].setValue(editData.firstName);
      this.userForm.controls['additionalName'].setValue(editData.additionalName);
      this.userForm.controls['lastName'].setValue(editData.lastName);
      this.userForm.controls['secondName'].setValue(editData.secondName);
      this.userForm.controls['isActive'].setValue(editData.isActive);
      this.userForm.controls['roles'].setValue(editData.roles);
      this.userForm.controls['isResponsible'].setValue(editData.roles);
      this.userForm.controls['profession'].setValue(editData.profession);

      console.log("roles edit", editData.roles);
      editData.roles.forEach(p => {
        this.selectedOptions.push(p['name']);

      })

      this.model.id = editData.id;
      this.isChecked = editData.isActive;
      this.isResponsible = editData.isResponsible;
      this.model.profession.id = editData.profession.id;
      console.log("form", this.userForm.value)


    }
  }
  editarClient() {
    this.modelClient(this.userForm);
    super.editar();
    this.onReset();
    super.toast("success", "Modificado  con éxito");
  }

  modelClient(userForm: any) {

      this.model.email = userForm.get('email').value,
      this.model.firstName = userForm.get('firstName').value,
      this.model.additionalName = userForm.get('additionalName').value,
      this.model.lastName = userForm.get('lastName').value,
      this.model.secondName = userForm.get('secondName').value,
      this.model.isActive = userForm.get('isActive').value;
      this.model.roles = userForm.get('roles').value;
      this.model.isResponsible = userForm.get('isResponsible').value;
  }
  compareObjects(o1: any, o2: any) {
    if (o1.name == o2.name) {
      return true;
    }
    return false
  }
  optionSelected(event: any) {
    this.model.profession.id = event.id;


  }
  public displayProperty(value) {
    console.log("Selected2 : ", value);
    if (value) {
      return value.name;
    }
  }
  getAllProfessions() {
    this.service.getAllProfessions().subscribe(data => {

      this.professions = data;
      console.log("professions" + this.professions);
    })
  }
}
