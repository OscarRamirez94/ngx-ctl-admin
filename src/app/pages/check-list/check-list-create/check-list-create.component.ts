import { Overlay } from '@angular/cdk/overlay';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
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
import { CommonListComponent } from '../../commons/common-list/common-list.component';


@Component({
  selector: 'ngx-check-list-create',
  templateUrl: './check-list-create.component.html',
  styleUrls: ['./check-list-create.component.scss']
})
export class CheckListCreateComponent extends CommonListComponent<CheckList, CheckListService> implements OnInit {

  checkListForm !: FormGroup;

  clients:Client[];
  transportLines:TransportLine[];
  transportCapacities:TransportCapacity[];
  transportTypes:TransportType[];
  surveillances:Person[];
  responsibles:User[];
  submitted = false;
  actionBtn:String = "Crear";
  isChecked;
  processType:ProcessType = new ProcessType(1,true,"Descargar");
  myControl = new FormControl('');
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());




  constructor(
    service:CheckListService,
    router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private formBuilder:FormBuilder,
    private authRoleService:AuthRoleService,
    private  dialogRef: MatDialogRef<CheckListCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any
    ) {
      super(service, router, route,toastrService);
      this.model = new CheckList();
    this.model.partner = new Client();
    this.model.transportLine = new TransportLine();
    this.model.transportCapacity = new TransportCapacity();
    this.model.surveillance = new Person();
    this.model.responsible = new User();
    this.transportCapacities = [];
    this.titulo = 'Agregar Clients';
    this.redirect = '/pages/clients/clientes';
    this.nombreModel = "Check List";
   }



  ngOnInit(): void {

    this.setForm();
    this.rejectForm(this.editData);
    super.paginator;


    this.getAllClients();
    this.getAllTransportLines();
    this.getAllTransportTypes();
    this.getAllPersons();
    this.getResponsibles();



  }
  get f() { return this.checkListForm.controls; }

  onSubmit() {
    this.submitted = true;
      if (this.checkListForm.invalid) {
          return;
      }
      if (!this.editData) {
        this.modelClient(this.checkListForm);
        /*this.service.crear(this.model as CheckList).subscribe(data =>{

        });
        */
        super.crear();
        this.onReset();
      } else {
        this.editarClient();
      }
  }

  onReset() {
        this.submitted = false;
        this.checkListForm.reset();
        this.editData = null;
        this.dialogRef.close("true");
      }

  setForm() {
        this.checkListForm = this.formBuilder.group({
          date :[new Date(),Validators.required],
          remision:['',Validators.required],
          hours:['',Validators.required],
          partner:['',Validators.required],
          transportLine:['',Validators.required],
          operator:['',Validators.required],

          ecoTracto:['',Validators.required],
          tractoPlacas:['',Validators.required],
          ecoCaja:['',Validators.required],
          cajaPlacas :['',Validators.required],
          tipoTransporte:['',Validators.required],
          transportCapacity:['',Validators.required],
          noSello:['',Validators.required],
          surveillance:['',Validators.required],
          responsible:['',Validators.required],
          observation :['',Validators.required],
          noRampa :['',Validators.required],

        });
    }

    modelClient(checkListForm:any) {

      this.model.date = checkListForm.get('date').value;
      this.model.remision = checkListForm.get('remision').value;
      this.model.hours = checkListForm.get('hours').value;
      this.model.processType = this.processType;
      this.model.operator = checkListForm.get('operator').value;

      this.model.ecoTracto = checkListForm.get('ecoTracto').value;
      this.model.tractoPlacas = checkListForm.get('tractoPlacas').value;
      this.model.ecoCaja = checkListForm.get('ecoCaja').value;
      this.model.cajaPlacas = checkListForm.get('cajaPlacas').value;
      this.model.noSello = checkListForm.get('noSello').value;
      this.model.operator = checkListForm.get('operator').value;
      this.model.observation = checkListForm.get('observation').value;
      this.model.noRampa = checkListForm.get('noRampa').value;

    }
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

    getAllTransportLines(){
      this.service.getAllTransportLines().subscribe(data =>{
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

  getAllTransportTypes(){
    this.service.getAllTransportTypes().subscribe(data =>{
    this.transportTypes = data;

    })

  }


  optionSelectedTransportType(event:TransportType){
    this.checkListForm.controls['transportCapacity'].reset()
    this.getAllTransportCapacities(event.id);
  }

  displayPropertyTransportType(value) {

    if (value) {
      return value.name;
    }
  }


  getAllPersons(){
    this.service.getAllPersons().subscribe(data =>{
      this.surveillances = data.filter(p =>{

        return p.profession.name == "Vigilancia";
      });

     /* this.supervisors = data.filter(p =>{

        return p.profession.name != "Vigilancia";
      });
*/
    });



  }


  optionSelectedSurveillance(event:Person){
  this.model.surveillance.id = event.id;
}

displayPropertySurveillance(value) {

  if (value) {
    return value.firstName;
  }
}


getResponsibles(){
  this.service.getAllUsersIsResposible().subscribe(data =>{
    this.responsibles = data
  });



}

optionSelectedUser(event:Person){
  this.model.responsible.id = event.id;
}

displayPropertyUser(value) {

  if (value) {
    return value.firstName;
  }
}
role(role:string){

  return this.authRoleService.hasRole(role);
}

rejectForm(editData:any) {
  if (editData) {

    console.log("EDITAR::" + JSON.stringify(editData))
    this.actionBtn ="Modificar";

    this.checkListForm.controls['date'].setValue(editData.date);
    this.checkListForm.controls['remision'].setValue(editData.remision);
    this.checkListForm.controls['hours'].setValue(editData.hours);
    this.checkListForm.controls['partner'].setValue(editData.partner);
    this.checkListForm.controls['transportLine'].setValue(editData.transportLine);
    this.checkListForm.controls['operator'].setValue(editData.operator);
    this.checkListForm.controls['ecoTracto'].setValue(editData.ecoTracto);
    this.checkListForm.controls['tractoPlacas'].setValue(editData.tractoPlacas);
    this.checkListForm.controls['ecoCaja'].setValue(editData.ecoCaja);
    this.checkListForm.controls['cajaPlacas'].setValue(editData.cajaPlacas);
    this.checkListForm.controls['tipoTransporte'].setValue(editData.transportCapacity.transportType);
    this.checkListForm.controls['transportCapacity'].setValue(editData.transportCapacity);
    this.checkListForm.controls['noSello'].setValue(editData.noSello);
    this.checkListForm.controls['surveillance'].setValue(editData.surveillance);
    this.checkListForm.controls['responsible'].setValue(editData.responsible);
    this.checkListForm.controls['observation'].setValue(editData.observation);
    this.checkListForm.controls['noRampa'].setValue(editData.noRampa);
    this.model.id = editData.id;
    this.isChecked = editData.isActive;


    this.model.partner.id=editData.partner.id;
    this.model.transportLine.id=editData.transportLine.id;
    //this.model.tran.id=editData.tipoTransporte.id;
    this.model.transportCapacity.id=editData.transportCapacity.id;
    this.model.surveillance.id=editData.surveillance.id;

  }
}

editarClient() {
  this.modelClient(this.checkListForm);
  super.editar();
  this.onReset();
  super.toast("success","Modificado  con éxito");
}
}
