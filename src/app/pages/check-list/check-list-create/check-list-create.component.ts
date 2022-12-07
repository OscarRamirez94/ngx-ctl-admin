import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { map, Observable, startWith } from 'rxjs';
import { TransportCapacityI } from '../../../interfaces/transport-capacity-i';
import { TransportLineI } from '../../../interfaces/transport-line-i';
import { TransportTypeI } from '../../../interfaces/transport-type-i';
import { UserI } from '../../../interfaces/user-i';
import { CheckList } from '../../../models/check-list/check-list';
import { Client } from '../../../models/client';
import { Person } from '../../../models/person/person';
import { ProcessType } from '../../../models/process-type/process-type';
import { TransportLine } from '../../../models/transport-line/transport-line';
import { TransportCapacity } from '../../../models/transport_capacity/transport-capacity';
import { TransportType } from '../../../models/transport_type/transport-type';
import { User } from '../../../models/user/user';
import { AuthRoleService } from '../../../services/auth/auth-role.service';
import { CheckListService } from '../../../services/check-list/check-list.service';
import { ClientService } from '../../../services/client/client.service';
import { HeadService } from '../../../services/head/head.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';


@Component({
  selector: 'ngx-check-list-create',
  templateUrl: './check-list-create.component.html',
  styleUrls: ['./check-list-create.component.scss']
})
export class CheckListCreateComponent extends CommonListComponent<CheckList, CheckListService> implements OnInit  {
  clients:Client[];
  transportLines:TransportLineI[] = [];
  transportCapacities:TransportCapacityI[] = [];
  transportTypes:TransportTypeI[]=[];
  surveillances:UserI[]=[];
  responsibles:UserI[]=[];
  processType:ProcessType = new ProcessType(1,true,"in");
  myControl = new FormControl('');
  clientId;
  partner=this.headService.getNameClientLS();
  submitted = false;
  actionBtn:String = "Crear";
  isEditable= true;
  status:string;
  prefijo:Client;
  firstFormGroup !: FormGroup;
  secondFormGroup !: FormGroup;
  thirdFormGroup !: FormGroup;

  filteredTransportLines: Observable<TransportLineI[]>;
  filteredTransportTypes: Observable<TransportTypeI[]>;
  filteredTransportCapacities: Observable<TransportCapacityI[]>;
  filteredSurveillances: Observable<UserI[]>;
  filteredResponsibles: Observable<UserI[]>;




  constructor(service:CheckListService,router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private _formBuilder:FormBuilder,private authRoleService:AuthRoleService,headService:HeadService,
    private clientService:ClientService,
    private  dialogRef: MatDialogRef<CheckListCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any,)
    {
      super(service, router, route,toastrService,headService);
      this.model = new CheckList();
      this.model.partner = new Client();
      this.model.transportLine = new TransportLine();
      this.model.transportCapacity = new TransportCapacity();
      this.model.surveillance = new User();
      this.model.responsible = new User();
      this.transportCapacities = [];
      this.titulo = 'Agregar Clients';
      this.redirect = '/pages/clients/clientes';
      this.nombreModel = "Registro";
    }

  get f() { return this.firstFormGroup.controls; }
  get f2() { return this.secondFormGroup.controls; }
  get f3() { return this.thirdFormGroup.controls; }


  ngOnInit(): void {

    this.clientId =  this.headService.getClientLS();


    this.initForm();

    this.getAllTransportLines(this.clientId);
    this.getAllTransportTypes();
    this.getResponsibles();

    this.rejectForm(this.editData);
    super.paginator;

  }

  //init
  initForm(){



    this.firstFormGroup = this._formBuilder.group({
      remision:['',Validators.required],
      partner :[{ value : this.partner,disabled: true},Validators.required],
      processType :[{ value : this.processType.name,disabled: true},Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
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

    this.thirdFormGroup = this._formBuilder.group({
      observation :[''],
    });



    this.filteredTransportLines = this.secondFormGroup.get("transportLine").valueChanges.pipe(
      startWith(null),
      map(transportLine => (transportLine ? this._filterTransportLine(transportLine) : this.transportLines.slice())),
    );
    this.filteredTransportTypes = this.secondFormGroup.get("tipoTransporte").valueChanges.pipe(
      startWith(null),
      map(transportType => (transportType ? this._filterTransportType(transportType) : this.transportTypes.slice())),
    );
    this.filteredTransportCapacities = this.secondFormGroup.get("transportCapacity").valueChanges.pipe(
      startWith(null),
      map(transportCapacity => (transportCapacity ? this._filterTransportCapacity(transportCapacity) : this.transportCapacities.slice())),
    );

    this.filteredSurveillances = this.secondFormGroup.get("surveillance").valueChanges.pipe(
      startWith(null),
      map(user => (user ? this._filterTransportSurveillance(user) : this.surveillances.slice())),
    );
    this.filteredResponsibles = this.secondFormGroup.get("responsible").valueChanges.pipe(
      startWith(null),
      map(user => (user ? this._filterTransportResponsible(user) : this.responsibles.slice())),
    );



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
      this.transportLines = data as TransportLineI[];
    })
  }

  // get capacities
  getAllTransportCapacities(id:any){
    this.service.getAllTransportCapacities(id).subscribe(data =>{
      this.transportCapacities = data;
    })
  }

  // get transporTypes
  getAllTransportTypes(){
      this.service.getAllTransportTypes().subscribe(data =>{
      this.transportTypes = data;
    })
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
           // super.toast("warning","Ocurrio un error");
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
      this.getAllTransportCapacities(editData.transportCapacity.transportType.id);
    }
  }

  editarClient() {
    this.modelCheckList(this.firstFormGroup,this.secondFormGroup,this.thirdFormGroup);
    super.editar();
    this.onReset();
    super.toast("success","Modificado  con éxito");
  }

    // filtered TransportLines
    private _filterTransportLine(value: string): TransportLineI[] {
      console.log("value",value);
      const filterValue = value.toString().toLowerCase();

      return this.transportLines.filter(transportLine => transportLine.name.toString().toLowerCase().includes(filterValue));
    }
    optionSelectedTransportLine(event:TransportLineI){

      this.model.transportLine.id = event.id ;
    }
    displayPropertyTransportLine(value) {

      if (value) {
        return value.name;
      }
    }
    //filtered transportypes
    private _filterTransportType(value: string): TransportTypeI[] {
      console.log("value",value);
      const filterValue = value.toString().toLowerCase();

      return this.transportTypes.filter(transportType => transportType.name.toString().toLowerCase().includes(filterValue));
    }

    optionSelectedTransportType(event:TransportType){
      this.transportCapacities = [];
      this.secondFormGroup.controls['transportCapacity'].reset()

      this.getAllTransportCapacities(event.id);
    }

    displayPropertyTransportType(value) {
      if (value) {
        return value.name;
      }
    }

    // filtered transportCapacities

    private _filterTransportCapacity(value: string): TransportCapacityI[] {
      console.log("value",value);
      const filterValue = value.toString().toLowerCase();

      return this.transportCapacities.filter(
        transportCapacity => transportCapacity.capacity.toString().toLowerCase().includes(filterValue) ||
        transportCapacity.unity.toString().toLowerCase().includes(filterValue)
        );
    }

    optionSelectedTransportCapacity(event:TransportCapacity){
      this.model.transportCapacity.id = event.id;
    }

    displayPropertyTransportCapacity(value) {
      if (value) {
          return value.capacity.concat(" | ").concat( value.unity);
      }
    }

    // Filtered responsibles

    private _filterTransportSurveillance(value: string): UserI[] {
      console.log("value",value);
      const filterValue = value.toString().toLowerCase();

      return this.surveillances.filter(
        user => user.firstName.toString().toLowerCase().includes(filterValue) ||
        user.lastName.toLowerCase().includes(filterValue) ||
        user.secondName.toLowerCase().includes(filterValue)
        );
    }

    optionSelectedSurveillance(event:Person){
      this.model.surveillance.id = event.id;
    }

    displayPropertySurveillance(value) {
      if (value) {
        return value.firstName + ' ' + value.additionalName  + ' ' + value.lastName + ' ' + value.secondName;
      }
    }

    // Filtered surveillances
    private _filterTransportResponsible(value: string): UserI[] {
      console.log("value",value);
      const filterValue = value.toString().toLowerCase();

      return this.responsibles.filter(
        user => user.firstName.toString().toLowerCase().includes(filterValue) ||
        user.lastName.toLowerCase().includes(filterValue) ||
        user.secondName.toLowerCase().includes(filterValue)
        );
    }

    optionSelectedUser(event:Person){
      this.model.responsible.id = event.id;
    }

    displayPropertyUser(value) {
      if (value) {
        return value.firstName + ' ' + value.additionalName  + ' ' + value.lastName + ' ' + value.secondName;
      }
    }




}
