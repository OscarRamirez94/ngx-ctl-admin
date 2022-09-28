import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckList } from '../../../models/check-list/check-list';
import { Client } from '../../../models/client';
import { ProcessType } from '../../../models/process-type/process-type';
import { TransportLine } from '../../../models/transport-line/transport-line';
import { TransportCapacity } from '../../../models/transport_capacity/transport-capacity';
import { TransportType } from '../../../models/transport_type/transport-type';
import { CheckListService } from '../../../services/check-list/check-list.service';


@Component({
  selector: 'ngx-check-list-create',
  templateUrl: './check-list-create.component.html',
  styleUrls: ['./check-list-create.component.scss']
})
export class CheckListCreateComponent implements OnInit {

  checkListForm !: FormGroup;

  clients:Client[];
  transportLines:TransportLine[];
  transportCapacities:TransportCapacity[];
  transportTypes:TransportType[];

  submitted = false;
  actionBtn:String = "Crear";
  isChecked;
  model:CheckList = new CheckList();
  processType:ProcessType = new ProcessType(1,true,"Descargar");

  myControl = new FormControl('');


  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());


  constructor(private formBuilder:FormBuilder,
    public checkListService:CheckListService) {
    console.log("now" + new Date())
    this.model.partner = new Client();
    this.model.transporLine = new TransportLine();
    this.model.transportCapacity = new TransportCapacity();
    this.transportCapacities = [];
   }

  ngOnInit(): void {
    this.getAllClients();
    this.getAllTransportLines();
    this.getAllTransportTypes();

    this.setForm();


  }
  get f() { return this.checkListForm.controls; }

  onSubmit() {

    this.submitted = true;
      // stop here if form is invalid
      console.log("form",this.checkListForm.value)
      if (this.checkListForm.invalid) {
          return;
      }

        console.log("form22",this.checkListForm.value)
         this.modelClient(this.checkListForm);
         this.checkListService.crear(this.model as CheckList).subscribe(data =>{
          console.log("data",data);
         });
         //super.toast("success","Cliente creado con éxito");
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

          /*



          hours:['',Validators.required],
          noSello:['',Validators.required],
          observation :['',Validators.required],
          operator:['',Validators.required],
          rampa:['',Validators.required],


          processType:['',Validators.required],
          */
          /*responsableOne:['',Validators.required],
          responsableTwo:['',Validators.required],

          transportCapacity:['',Validators.required],
          */
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




      //this.model.partner = checkListForm.get('partner').value;
      console.log("this.model",this.model)
      /*

      this.model.hours = checkListForm.get('hours').value;
      this.model.noSello = checkListForm.get('noSello').value;
      this.model.observation = checkListForm.get('observation').value;
      this.model.operator = checkListForm.get('operator').value;
      this.model.rampa = checkListForm.get('rampa').value;


      */
    }
    getAllClients(){
      this.checkListService.getAllClientes().subscribe(data =>{
        this.clients = data;
        console.log(this.clients);
      })
    }
    optionSelected(event:Client){
      console.log("event" + JSON.stringify(event));

      this.model.partner.id = event.id;


    }
    displayProperty(value) {
      console.log("Selected2 : ", value);
      if (value) {
        return value.name;
      }
    }

    getAllTransportLines(){
      this.checkListService.getAllTransportLines().subscribe(data =>{
        this.transportLines = data;
        console.log( "TT", this.transportLines);
      })
    }


  optionSelectedTransportLine(event:TransportLine){

    this.model.transporLine.id = event.id;


  }
  displayPropertyTransportLine(value) {
    console.log("Selected2 : ", value);
    if (value) {
      return value.name;
    }
  }

  getAllTransportCapacities(id:any){

    this.checkListService.getAllTransportCapacities(id).subscribe(data =>{
      this.transportCapacities = data;
      console.log( "TC", this.transportLines);
    })
  }


    optionSelectedTransportCapacity(event:TransportCapacity){

      this.model.transportCapacity.id = event.id;


    }

    displayPropertyTransportCapacity(value) {
      console.log("Selected2 : ", value);
      if (value) {
        return value.capacity.concat(" | ").concat( value.unity);
      }
    }

    getAllTransportTypes(){
      this.checkListService.getAllTransportTypes().subscribe(data =>{
        this.transportTypes = data;
        console.log( "TC", this.transportTypes);
      })
    }


      optionSelectedTransportType(event:TransportType){

        this.getAllTransportCapacities(event.id);


      }

      displayPropertyTransportType(value) {
        console.log("Selected2 : ", value);
        if (value) {
          return value.name;
        }
      }

}
