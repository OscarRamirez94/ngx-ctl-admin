import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransportTypeI } from '../../../interfaces/transport-type-i';
import { TransportCapacity } from '../../../models/transport_capacity/transport-capacity';
import { TransportType } from '../../../models/transport_type/transport-type';
import { TransportCapacityService } from '../../../services/transport-capacity/transport-capacity.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-transport-capacity-create',
  templateUrl: './transport-capacity-create.component.html',
  styleUrls: ['./transport-capacity-create.component.scss']
})
export class TransportCapacityCreateComponent extends CommonListComponent<TransportCapacity, TransportCapacityService> implements OnInit {

  transportCapacityForm !: FormGroup;
  submitted = false;
  actionBtn: String = "Crear";
  isChecked;
  isUnity:String;
  transportTypes:TransportTypeI[];
  myControl = new FormControl('');
  constructor(
    service: TransportCapacityService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private formBuilder: FormBuilder, private dialogRef: MatDialogRef<TransportCapacityCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    super(service, router, route, toastrService);
    this.titulo = 'Agregar Capcidad de Transporte';
    this.model = new TransportCapacity();
    this.model.transportType = new TransportType();
    this.redirect = '';
    this.nombreModel = "TransportCapacity";
  }

  ngOnInit(): void {
    this.setForm();
    console.log("editaData",this.editData);
    this.rejectForm(this.editData);
    super.paginator;
    this.getAllTransportType();
  }

  get f() { return this.transportCapacityForm.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.transportCapacityForm.invalid) {
      return;
    }
    if (!this.editData) {
      this.modelTransportCapacity(this.transportCapacityForm);
      super.crear();
      this.onReset();
      super.toast("success", "Capacidad de transporte creada con éxito");
    } else {
      this.editarTransportCapacity();
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
      transportType: ['', Validators.required],
    });
  }

  rejectForm(editData: any) {
    if (editData) {
      this.actionBtn = "Modificar";
      this.titulo ="Modificar Capacidad de transporte"
      this.transportCapacityForm.controls['capacity'].setValue(editData.capacity);
      this.transportCapacityForm.controls['unity'].setValue(editData.unity);
      this.transportCapacityForm.controls['isActive'].setValue(editData.isActive);
      this.transportCapacityForm.controls['transportType'].setValue(editData.transportType);
      this.model.id = editData.id;
      this.isChecked = editData.isActive;
      this.isUnity =editData.unity;
    }
  }
  editarTransportCapacity() {
    this.modelTransportCapacity(this.transportCapacityForm);
    super.editar();
    this.onReset();
    super.toast("success", "Modificado  con éxito");
  }

  modelTransportCapacity(transportCapacityForm: any) {
    this.model.capacity = transportCapacityForm.get('capacity').value;
    this.model.unity = transportCapacityForm.get('unity').value;
    this.model.isActive = transportCapacityForm.get('isActive').value;

  }
  getAllTransportType(){
    this.service.getAllTransportType().subscribe(data =>{
      console.log("data" + data);
      this.transportTypes = data ;
      console.log("transportTypes" + this.transportTypes);
    })
  }

  optionSelected(event:any){
      this.model.transportType.id = event.id;


  }
  public displayProperty(value) {
    console.log("Selected2 : ", value);
    if (value) {
      return value.name;
    }
  }
}

