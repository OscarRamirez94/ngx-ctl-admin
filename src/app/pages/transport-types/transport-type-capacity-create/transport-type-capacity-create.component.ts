import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransportTypeI } from '../../../interfaces/transport-type-i';
import { TransportCapacity } from '../../../models/transport_capacity/transport-capacity';
import { TransportType } from '../../../models/transport_type/transport-type';
import { HeadService } from '../../../services/head/head.service';
import { TransportCapacityService } from '../../../services/transport-capacity/transport-capacity.service';
import { TransportTypeService } from '../../../services/transport-type/transport-type.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-transport-type-capacity-create',
  templateUrl: './transport-type-capacity-create.component.html',
  styleUrls: ['./transport-type-capacity-create.component.scss']
})
export class TransportTypeCapacityCreateComponent extends CommonListComponent<TransportCapacity, TransportCapacityService> implements OnInit {

  transportCapacityForm !: FormGroup;
  submitted = false;
  actionBtn: String = "Crear";
  isChecked;
  isUnity:String;
  transportTypes:TransportTypeI[];
  myControl = new FormControl('');
  id:any;
  transportType:any;
  disabled:boolean = false;
  editable:any;
constructor(
    service: TransportCapacityService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private formBuilder: FormBuilder, private dialogRef: MatDialogRef<TransportTypeCapacityCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    headService:HeadService,
    private transportTypeService: TransportTypeService,

  ) {
    super(service, router, route, toastrService,headService);
    this.titulo = 'Capacidad de Transporte';
    this.model = new TransportCapacity();
    this.model.transportType = new TransportType();
    this.redirect = '';
    this.nombreModel = "TransportCapacity";

  }

  ngOnInit(): void {
    this.valida(this.editData);
    this.setForm();
    super.paginator;
    this.rejectForm(this.editable);

  }

  get f() { return this.transportCapacityForm.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.transportCapacityForm.invalid) {
      return;
    }
      if (this.editable === false){
        this.modelTransportCapacity(this.transportCapacityForm);
        super.crear();
        this.onReset();
        super.toast("success", "Capacidad de transporte creada con éxito");
      }else {
        this.editarTransportType();
      }

  }

  onReset() {
    this.submitted = false;
    this.transportCapacityForm.reset();
    this.editData = null;
    this.dialogRef.close("true");
  }

  setForm() {
    this.transportCapacityForm = this.formBuilder.group({
      capacity: ['', Validators.required],
      unity: ['', Validators.required],
      isActive: ['', Validators.required],
      transportType :[{ value : this.transportType.name,disabled: true},Validators.required],
    });
  }




  modelTransportCapacity(transportCapacityForm: any) {

    this.model.capacity = transportCapacityForm.get('capacity').value;
    this.model.unity = transportCapacityForm.get('unity').value;
    this.model.isActive = transportCapacityForm.get('isActive').value;
    this.model.transportType.id= this.transportType.id;

  }


  valida(editData:any) {
    this.transportType = editData[0] as TransportType;
    this.editable = editData[1];

  }

  rejectForm(editable: any) {
    if (editable !==false) {
      this.actionBtn = "Modificar";
      this.titulo ="Capacidad de transporte"
      this.transportCapacityForm.controls['capacity'].setValue(editable.capacity);
      this.transportCapacityForm.controls['unity'].setValue(editable.unity);
      this.transportCapacityForm.controls['isActive'].setValue(editable.isActive);
      this.model.id = editable.id;
      this.isUnity =  editable.unity;
      this.isChecked = editable.isActive;
    }
  }
  editarTransportType() {
    this.modelTransportCapacity(this.transportCapacityForm);
    super.editar();
    this.onReset();
    super.toast("success", "Modificado  con éxito");
  }

}
