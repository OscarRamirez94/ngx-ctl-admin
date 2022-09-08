import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Address } from '../../../models/address/address';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client/client.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';


@Component({
  selector: 'ngx-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})

export class ClientCreateComponent extends CommonListComponent<Client, ClientService> implements OnInit  {

  clientForm !: FormGroup;
  submitted = false;
  private fotoSeleccionada: File;
  constructor(
    service: ClientService,
    router: Router,
    route: ActivatedRoute,
    toastrService: NbToastrService,
    private formBuilder:FormBuilder,
    private  dialogRef: MatDialogRef<ClientCreateComponent>,

  ) {
    super(service, router, route,toastrService);
    this.titulo = 'Agregar Clients';
    this.model = new Client();
    this.model.address = new Address();
    this.redirect = '/pages/clients/clientes';
    this.nombreModel = "Cliente";
  }


ngOnInit(): void {
  this.clientForm = this.formBuilder.group({
    name :['',Validators.required],
    phone :['',Validators.required],
    attention:['',Validators.required],
    text:['',Validators.required],
    colonia:['',Validators.required],
    district:['',Validators.required],
    state :['',Validators.required],
    city:['',Validators.required],
    postalCode:['',Validators.required],
    country:['',Validators.required],

  })
  super.paginator;
}

  public seleccionarFoto(event): void {
    this.fotoSeleccionada = event.target.files[0];
    console.info(this.fotoSeleccionada);

    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      this.fotoSeleccionada = null;
     /* Swal.fire(
        'Error al seleccionar la foto:',
        'El archivo debe ser del tipo imagen',
        'error');
    }*/
  }
}
   crear(): void {
    if (this.clientForm.valid){

      console.log("click en crear");
      if(!this.fotoSeleccionada){
        this.model.isActive = true;

        console.log("super crear");
        super.crear();
        super.toast("success","Cliente creado con éxito");

      } else {
        this.service.crearConFoto(this.model, this.fotoSeleccionada);

      }
    }

  }

   editar(): void {
    if(!this.fotoSeleccionada){
      super.editar();
    } else {
      this.service.editarConFoto(this.model, this.fotoSeleccionada);

    }
  }

  get f() { return this.clientForm.controls; }

  onSubmit() {
    console.log(this.clientForm.get('name').value);
    this.model.name = this.clientForm.get('name').value;
    this.model.isActive = true;
    this.model.address.attention = this.clientForm.get('attention').value;
    this.model.address.city = this.clientForm.get('city').value;
    this.model.address.colonia = this.clientForm.get('colonia').value;
    this.model.address.country = this.clientForm.get('country').value;
    this.model.address.district = this.clientForm.get('district').value;
    this.model.address.phone = this.clientForm.get('phone').value;
    this.model.address.postalCode = this.clientForm.get('postalCode').value;
    this.model.address.state = this.clientForm.get('state').value;
    this.model.address.text = this.clientForm.get('text').value;
    this.submitted = true;

    // stop here if form is invalid
    if (this.clientForm.invalid) {
        return;
    }
    super.crear();
    this.dialogRef.close("true");
    this.clientForm.reset();

    super.toast("success","Cliente creado con éxito");
}

onReset() {
  this.submitted = false;
  this.clientForm.reset();
}
}
