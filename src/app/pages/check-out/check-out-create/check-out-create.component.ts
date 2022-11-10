import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CheckList } from '../../../models/check-list/check-list';
import { CheckOut } from '../../../models/check-out/check-out';
import { Client } from '../../../models/client';
import { Person } from '../../../models/person/person';
import { ProcessType } from '../../../models/process-type/process-type';
import { TransportLine } from '../../../models/transport-line/transport-line';
import { TransportCapacity } from '../../../models/transport_capacity/transport-capacity';
import { TransportType } from '../../../models/transport_type/transport-type';
import { User } from '../../../models/user/user';
import { AuthRoleService } from '../../../services/auth/auth-role.service';
import { CheckListService } from '../../../services/check-list/check-list.service';
import { CheckOutService } from '../../../services/check-out/check-out.service';
import { HeadService } from '../../../services/head/head.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';


@Component({
  selector: 'ngx-check-out-create',
  templateUrl: './check-out-create.component.html',
  styleUrls: ['./check-out-create.component.scss']
})
export class CheckOutCreateComponent extends CommonListComponent<CheckOut, CheckOutService> implements OnInit  {
  clients:Client[];
  transportLines:TransportLine[];
  transportCapacities:TransportCapacity[];
  transportTypes:TransportType[];
  surveillances:User[];
  responsibles:User[];
  processType:ProcessType = new ProcessType(2,true,"Out");
  myControl = new FormControl('');
  clientId;
  partner=this.headService.getNameClientLS();
  submitted = false;
  actionBtn:String = "Crear";
  isEditable= true;
  status:string;

  firstFormGroup = this._formBuilder.group({
    remision:['',Validators.required],
    partner :[{ value : this.partner,disabled: true},Validators.required],
    processType :[{ value : this.processType.name,disabled: true},Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    transportLine:['',Validators.required],
    operator:['',Validators.required],
    tipoTransporte:['',Validators.required],
    transportCapacity:['',Validators.required],
    ecoTracto:['',Validators.required],
    tractoPlacas:['',Validators.required],
    ecoCaja:['',Validators.required],
    cajaPlacas :['',Validators.required],
    surveillance:['',Validators.required],
    responsible:['',Validators.required],
    noSello:['',Validators.required],
    noRampa :['',Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    observation :[''],
  });


  constructor(service:CheckOutService,router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private _formBuilder:FormBuilder,private authRoleService:AuthRoleService,headService:HeadService,
    private  dialogRef: MatDialogRef<CheckOutCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any,)
    {
      super(service, router, route,toastrService,headService);
      this.model = new CheckOut();
      this.model.partner = new Client();
      this.model.transportLine = new TransportLine();
      this.model.transportCapacity = new TransportCapacity();
      this.model.surveillance = new User();
      this.model.responsible = new User();
      this.transportCapacities = [];
      this.titulo = 'Agregar Clients';
      this.redirect = '/pages/clients/clientes';
      this.nombreModel = "Check List";
    }

  get f() { return this.firstFormGroup.controls; }
  get f2() { return this.secondFormGroup.controls; }
  get f3() { return this.thirdFormGroup.controls; }


  ngOnInit(): void {
    this.clientId =  this.headService.getClientLS();
    this.getAllTransportLines(this.clientId);
    this.getAllTransportTypes();

    this.getResponsibles();
    this.rejectForm(this.editData);
    super.paginator;
  }

  // get Client
  getAllClients(){
    this.service.getAllClientes().subscribe(data =>{
      this.clients = data;
    })
  }

  optionSelected(event:Client){
    this.model.partner.id = event.id;
  }

  displayProperty(value) {
    if (value) {
      return value.name;
    }
  }
// get transport line
  getAllTransportLines(id:any){
    this.service.getAllTransportLines(id).subscribe(data =>{
      this.transportLines = data;
    })
  }

  optionSelectedTransportLine(event:TransportLine){
    this.model.transportLine.id = event.id;
  }

  displayPropertyTransportLine(value) {
    if (value) {
      return value.name;
    }
  }

  // get capacities
  getAllTransportCapacities(id:any){
    this.service.getAllTransportCapacities(id).subscribe(data =>{
      this.transportCapacities = data;
    })
  }

  optionSelectedTransportCapacity(event:TransportCapacity){
    this.model.transportCapacity.id = event.id;
  }

  displayPropertyTransportCapacity(value) {
    if (value) {
        return value.capacity.concat(" | ").concat( value.unity);
    }
  }

  // get transporTypes
  getAllTransportTypes(){
      this.service.getAllTransportTypes().subscribe(data =>{
      this.transportTypes = data;
    })
  }

  optionSelectedTransportType(event:TransportType){
    this.secondFormGroup.controls['transportCapacity'].reset()
    this.getAllTransportCapacities(event.id);
  }

  displayPropertyTransportType(value) {
    if (value) {
      return value.name;
    }
  }






  optionSelectedSurveillance(event:Person){
    this.model.surveillance.id = event.id;
  }

  displayPropertySurveillance(value) {
    if (value) {
      return value.firstName + ' ' + value.lastName;
    }
  }

  // get persons responsibles
  getResponsibles(){
    this.service.getAllUsersIsResposible().subscribe(data =>{
      this.responsibles = data.filter(p =>{
        return p.profession.name !== "Vigilancia";
      });
      this.surveillances = data.filter(p =>{
        return p.profession.name == "Vigilancia";
      });
    });
  }

  optionSelectedUser(event:Person){
    this.model.responsible.id = event.id;
  }

  displayPropertyUser(value) {
    if (value) {
      return value.firstName + ' ' + value.lastName;
    }
  }

  role(role:string){
    return this.authRoleService.hasRole(role);
  }

  onSubmit() {
    this.submitted = true;
      if (this.firstFormGroup.invalid && this.secondFormGroup.invalid ) {
          return;
      }
      if (!this.editData) {
        this.modelCheckList(this.firstFormGroup,this.secondFormGroup,this.thirdFormGroup);
        super.crear().subscribe(data =>{
          if (data){
            super.toast("success","Se inserto con éxito");
            this.onReset();
          }else {

          }
        });

      }else {
        this.editarClient();
      }
    }

  modelCheckList(firstFormGroup:any, secondFormGroup:any,thirdFormGroup:any){

    this.model.remision = firstFormGroup.get('remision').value;
    this.model.partner.id =this.clientId;
    this.model.processType = this.processType;
    this.model.operator = secondFormGroup.get('operator').value;
    this.model.ecoTracto = secondFormGroup.get('ecoTracto').value;
    this.model.tractoPlacas = secondFormGroup.get('tractoPlacas').value;
    this.model.ecoCaja = secondFormGroup.get('ecoCaja').value;
    this.model.cajaPlacas = secondFormGroup.get('cajaPlacas').value;
    this.model.noSello = secondFormGroup.get('noSello').value;
    this.model.operator = secondFormGroup.get('operator').value;
    this.model.noRampa = secondFormGroup.get('noRampa').value;

    this.model.observation = thirdFormGroup.get('observation').value;
  }

  onReset() {
    this.submitted = false;
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
    this.editData = null;
    this.dialogRef.close("true");
  }

  rejectForm(editData:any) {
    if (editData) {
      this.status =  editData.status;
      console.log("EDITAR::" + JSON.stringify(editData))
      this.actionBtn ="Modificar";


      this.firstFormGroup.controls['remision'].setValue(editData.remision);
      this.firstFormGroup.controls['partner'].setValue(this.partner);
      this.secondFormGroup.controls['transportLine'].setValue(editData.transportLine);
      this.secondFormGroup.controls['operator'].setValue(editData.operator);
      this.secondFormGroup.controls['ecoTracto'].setValue(editData.ecoTracto);
      this.secondFormGroup.controls['tractoPlacas'].setValue(editData.tractoPlacas);
      this.secondFormGroup.controls['ecoCaja'].setValue(editData.ecoCaja);
      this.secondFormGroup.controls['cajaPlacas'].setValue(editData.cajaPlacas);
      this.secondFormGroup.controls['tipoTransporte'].setValue(editData.transportCapacity.transportType);
      this.secondFormGroup.controls['transportCapacity'].setValue(editData.transportCapacity);
      this.secondFormGroup.controls['noSello'].setValue(editData.noSello);
      this.secondFormGroup.controls['surveillance'].setValue(editData.surveillance);
      this.secondFormGroup.controls['responsible'].setValue(editData.responsible);
      this.secondFormGroup.controls['noRampa'].setValue(editData.noRampa);
      this.thirdFormGroup.controls['observation'].setValue(editData.observation);
      this.model.id = editData.id;

      this.model.partner.id=editData.partner.id;
      this.model.transportLine.id=editData.transportLine.id;
      //this.model.tran.id=editData.tipoTransporte.id;
      this.model.transportCapacity.id=editData.transportCapacity.id;
      this.model.surveillance.id=editData.surveillance.id;
      this.model.responsible.id=editData.responsible.id;
    }
  }

  editarClient() {
    this.modelCheckList(this.firstFormGroup,this.secondFormGroup,this.thirdFormGroup);
    super.editar();
    this.onReset();
    super.toast("success","Modificado  con éxito");
  }

}
