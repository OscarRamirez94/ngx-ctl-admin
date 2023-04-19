import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { map, Observable, startWith } from 'rxjs';
import { ProfessionI } from '../../../interfaces/profession-i';
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
  professions: ProfessionI[] = [];
  userForm !: FormGroup;
  submitted = false;
  actionBtn: String = "Crear";
  isChecked;
  isResponsible;
  isUser;
  roles: string[] = ['ROLE_ADMIN', 'ROLE_USERS', 'ROLE_SUPER'];
  selectedOptions: string[] = [];
  loadingCreate = false;
  filteredProfessions: Observable<ProfessionI[]>;
  constructor(
    service: UserPostService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private formBuilder: FormBuilder, private dialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: UserPost,
    headService:HeadService
  ) {
    super(service, router, route, toastrService,headService);
    this.model = new UserPost();
    this.model.profession = new Profession();
    this.titulo = 'Agregar Usuario';

    this.redirect = '/pages/clients/clientes';
    this.nombreModel = "Usuario";

  }

  ngOnInit(): void {
    this.getAllProfessions();
    this.setForm();
    this.rejectForm(this.editData);
    super.paginator;
    this.showUsername();
  }

  get f() { return this.userForm.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }
    this.loadingCreate = true;
    if (!this.editData) {

      this.modelClient(this.userForm);
      super.crear().subscribe(data =>{
        if (data){
          this.onReset();
          this.loadingCreate = false;
        } else {

          this.loadingCreate = false;
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
      username: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      additionalName: [''],
      lastName: ['', Validators.required],
      secondName: ['', Validators.required],
      isActive: ['', Validators.required],
      roles: ['', Validators.required],
      isResponsible: ['', Validators.required],
      profession: ['', Validators.required],
      isUser: ['', Validators.required],
    });

    this.filteredProfessions = this.userForm.get("profession").valueChanges.pipe(
      startWith(null),
      map(profession => (profession ? this._filterProfession(profession) : this.professions.slice())),
    );




  }

  rejectForm(editData: UserPost) {
    if (editData) {

      this.actionBtn = "Modificar";
      this.userForm.controls['username'].setValue(editData.username);
      this.userForm.controls['email'].setValue(editData.email);
      this.userForm.controls['firstName'].setValue(editData.firstName);
      this.userForm.controls['additionalName'].setValue(editData.additionalName);
      this.userForm.controls['lastName'].setValue(editData.lastName);
      this.userForm.controls['secondName'].setValue(editData.secondName);
      this.userForm.controls['isActive'].setValue(editData.isActive);
      this.userForm.controls['roles'].setValue(editData.roles);
      this.userForm.controls['isResponsible'].setValue(editData.isResponsible);
      this.userForm.controls['profession'].setValue(editData.profession);
      this.userForm.controls['isUser'].setValue(editData.isUser);


      editData.roles.forEach(p => {
        this.selectedOptions.push(p['name']);

      })

      this.model.id = editData.id;
      this.isChecked = editData.isActive;
      this.isResponsible = editData.isResponsible;
      this.isUser = editData.isUser;
      this.model.profession.id = editData.profession.id;



    }
  }
  editarClient() {
    this.loadingCreate = true;
    this.modelClient(this.userForm);
    super.editar().subscribe(data =>{

      if (data){
        this.onReset();
        super.toast("success", "Modificado  con éxito");
        this.loadingCreate= false;
      }

    });

  }

  modelClient(userForm: any) {
      this.model.username = userForm.get('username').value,
      this.model.email = userForm.get('email').value,
      this.model.firstName = userForm.get('firstName').value,
      this.model.additionalName = userForm.get('additionalName').value,
      this.model.lastName = userForm.get('lastName').value,
      this.model.secondName = userForm.get('secondName').value,
      this.model.isActive = userForm.get('isActive').value;
      this.model.roles = userForm.get('roles').value;
      this.model.isResponsible = userForm.get('isResponsible').value;
      this.model.isUser = userForm.get('isUser').value;
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

    if (value) {
      return value.name;
    }
  }
  getAllProfessions() {
    this.service.getAllProfessions().subscribe(data => {

      this.professions = data as ProfessionI[];

    })
  }
  private _filterProfession(value: string): ProfessionI[] {

    const filterValue = value.toString().toLowerCase();

    return this.professions.filter(profession =>
      profession.name.toString().toLowerCase().includes(filterValue)
      );
  }

  showUsername(){

    this.userForm.get('email').valueChanges.subscribe(data =>{

    let arry = data.split("@");
    let username = arry[0].replace(".","-");

    this.userForm.controls['username'].setValue(username);

    })

  }
}
