import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Address } from '../../../models/address/address';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client/client.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
import { DialogData } from '../client-main/client-main.component';



@Component({
  selector: 'ngx-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent extends CommonListComponent<Client, ClientService> implements OnInit {
  private fotoSeleccionada: File;
  constructor(
    service: ClientService,
    router: Router,
    route: ActivatedRoute,
    toastrService: NbToastrService,
    public dialogRef: MatDialogRef<ClientCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,


  ) {
    super(service, router, route,toastrService);
    this.titulo = 'Agregar Clients';
    this.model = new Client();
    this.model.address = new Address();
    this.redirect = '/pages/clients/clientes';
    this.nombreModel = "Cliente";
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    console.log("cierra por boton");
    this.dialogRef.close();
    super.ngOnInit();

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

   editar(): void {
    if(!this.fotoSeleccionada){
      super.editar();
    } else {
      this.service.editarConFoto(this.model, this.fotoSeleccionada);

    }
  }



}
