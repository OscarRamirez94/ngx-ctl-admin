import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Console } from 'console';
import { Address } from '../../../models/address/address';
import { Client } from '../../../models/client';
import { Notification } from '../../../models/notification/notification';
import { ClientService } from '../../../services/client/client.service';
import { HeadService } from '../../../services/head/head.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';


@Component({
  selector: 'ngx-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})

export class ClientCreateComponent extends CommonListComponent<Client, ClientService> implements OnInit  {

  clientForm !: FormGroup;
  submitted = false;
  actionBtn:String = "Crear";
  isChecked;
  clientOg:string;
  clientO:Client;
  localId:string;
  constructor(
    service: ClientService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private formBuilder:FormBuilder, private  dialogRef: MatDialogRef<ClientCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    headService:HeadService
  ) {
      super(service, router, route,toastrService,headService);
      this.titulo = 'Agregar Clients';
      this.model = new Client();
      this.model.address = new Address();
      this.redirect = '/pages/clients/clientes';
      this.nombreModel = "Cliente";
    }

  ngOnInit(): void {
    this.localId = this.headService.getClientLS();
    this.setForm();
    this.getClienteOriginal(this.editData);
    this.rejectForm(this.editData);
    super.paginator;
  }

  get f() { return this.clientForm.controls; }

  onSubmit() {
    console.log("console",this.clientForm.value);
    this.submitted = true;
      // stop here if form is invalid

      if (this.clientForm.invalid) {
          return;
      }
      if (!this.editData) {
         this.modelClient(this.clientForm);
         super.crear();
         this.onReset();
         this.sendNotification();

         //super.toast("success","Cliente creado con éxito");
      }  else {
          this.editarClient();
      }
      //notifica

  }

  onReset() {
    this.submitted = false;
    this.clientForm.reset();
    this.editData = null;
    this.dialogRef.close("true");
  }

  setForm() {
    this.clientForm = this.formBuilder.group({
      //^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
      //name :['',[Validators.required,RxwebValidators.alpha()]],
      name:['',[ Validators.required,RxwebValidators.pattern({expression:{'onlyAlpha': /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/} })]],
      phone :['',Validators.required],
      attention:['',Validators.required],
      text:['',Validators.required],
      colonia:['',Validators.required],
      district:['',Validators.required],
      state :['',Validators.required],
      city:['',Validators.required],
      postalCode:['',Validators.required],
      country:['',Validators.required],
      isActive:['',Validators.required],


    });
  }

  rejectForm(editData:any) {
    if (editData) {
      this.actionBtn ="Modificar";
      this.clientForm.controls['name'].setValue(editData.name);
      this.clientForm.controls['isActive'].setValue(editData.isActive);
      this.clientForm.controls['phone'].setValue(editData.address.phone);
      this.clientForm.controls['attention'].setValue(editData.address.attention);
      this.clientForm.controls['text'].setValue(editData.address.text);
      this.clientForm.controls['colonia'].setValue(editData.address.colonia);
      this.clientForm.controls['district'].setValue(editData.address.district);
      this.clientForm.controls['state'].setValue(editData.address.state);
      this.clientForm.controls['city'].setValue(editData.address.city);
      this.clientForm.controls['postalCode'].setValue(editData.address.postalCode);
      this.clientForm.controls['country'].setValue(editData.address.country);
      this.clientForm.controls['name'].setValue(editData.name);

      this.model.id = editData.id;
      this.isChecked = editData.isActive;
    }
  }

  editarClient() {
    this.modelClient(this.clientForm);
    super.editar();
    this.onReset();
    super.toast("success","Cliente modificado con éxito");
    this.sendNotification();
  }

  modelClient(clientForm:any) {
    this.model.name = clientForm.get('name').value;
    this.model.isActive = clientForm.get('isActive').value;
    this.model.address.attention = clientForm.get('attention').value;
    this.model.address.city = clientForm.get('city').value;
    this.model.address.colonia = clientForm.get('colonia').value;
    this.model.address.country = clientForm.get('country').value;
    this.model.address.district = clientForm.get('district').value;
    this.model.address.phone = clientForm.get('phone').value;
    this.model.address.postalCode = clientForm.get('postalCode').value;
    this.model.address.state = clientForm.get('state').value;
    this.model.address.text = clientForm.get('text').value;

  }

  getClienteOriginal(editData:any){
    if (editData) {
      this.clientOg = editData.name;
      this.clientO = editData;
    }
  }
  sendNotification(){
    let notifica =  new Notification();
    notifica.localId = this.localId;
    notifica.isActive = false;
    notifica.client = this.clientO;

    if  (this.clientOg === this.headService.getNameClientLS()){
        notifica.isActive = true;
        notifica.client = this.model;
        this.headService.saveClient(this.model.id.toString());
        this.headService.saveNameClient(this.model.name);
    }
    else {
      notifica.localId = this.localId;
      notifica.isActive = false;
      notifica.client = this.clientO;
    }
    this.headService.disparadorClientComp.emit(notifica);
  }
}
