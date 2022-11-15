import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { json } from '@rxweb/reactive-form-validators';
import { PalletI } from '../../../interfaces/pallet-i';
import { CheckOutSave } from '../../../models/check-out/CheckOutSave';
import { Pallet } from '../../../models/pallet/pallet';
import { Product } from '../../../models/product/product';
import { TransportLine } from '../../../models/transport-line/transport-line';
import { HeadService } from '../../../services/head/head.service';
import { PalletService } from '../../../services/pallet/pallet.service';
import { ProductService } from '../../../services/product/product.service';
import { TransportLineService } from '../../../services/transport-line/transport-line.service';
import { CommonListCheckComponent } from '../../commons/common-list/common-list.component-check';
import { CommonListClientComponent } from '../../commons/common-list/common-list.component-client';
import { CommonListPalletComponent } from '../../commons/common-list/common-list.component-pallet';
import { CheckOutPalletComponent } from '../check-out-pallet/check-out-pallet.component';

@Component({
  selector: 'ngx-check-out-pallet-test',
  templateUrl: './check-out-pallet-test.component.html',
  styleUrls: ['./check-out-pallet-test.component.scss']
})
export class CheckOutPalletTestComponent extends CommonListPalletComponent<Pallet, PalletService> implements OnInit  {

  actionBtn:String = "Buscar";
  name: string;
  titulo: string = "OUT";
  displayedColumns: string[] = ['select','id','remision','transportLine','date','name','code','ua','amount','um','lote','expiration'];
  clientName =  this.headService.getClientLS();
  option:string ="TODOS";
  filterBy:string =  "TODOS";

  remisionVisible:boolean=false;
  fechaVisible:boolean=false;
  transportLineVisible:boolean=false;
  productVisible:boolean=false;
  loteVisible:boolean=false;
  pageSizeOptions = [2, 25,50,100];

  remisionControl = new FormControl('', []);
  fechaControl = new FormControl('', []);
  typeSearchControl = new FormControl('', []);
  loteControl = new FormControl('', []);
  transportLineControl = new FormControl('', []);
  productControl = new FormControl('', []);

  products:Product[] = [];
  transportLines:TransportLine[] = [];
  options: string[] = ['TODOS','REMISION', 'FECHA','LINEA DE TRANSPORTE','PRODUCTO','LOTE'];

  checkOutdId:number;
  checkOutRemision:string;

  constructor(service: PalletService, router: Router, route: ActivatedRoute,
     private dialog: MatDialog, toastrService: NbToastrService,
     headService:HeadService,
     private productService:ProductService,
     private transportLineService:TransportLineService) {
    super(service, router, route, toastrService,headService);
  }

  ngOnInit(): void {
    this.checkOutdId  = +this.route.snapshot.paramMap.get("id");
    this.checkOutRemision = this.route.snapshot.paramMap.get("remision");
    this.getProductos();
    this.getTL();
    super.ngOnInit();

  }

  getProductos(){
    this.productService.getAllProductsByPartner(this.clientName).subscribe(data =>{
      this.products = data as Product[];
    })
  }
  optionSelectedProduct(event){
    console.log("valor id producto",event.option.value.id)
    this.filterBy =  event.option.value.id;

  }
  displayPropertyProduct(value){
    if (value) {
      return value.name;
    }
  }

  getTL(){
    this.transportLineService.getAllTLByPartner(this.clientName).subscribe(data =>{
      this.transportLines = data as TransportLine[];
    })
  }
  optionSelectedTL(event){
    console.log("valor id tl",event.option.value.id)
    this.filterBy =  event.option.value.id;

  }
  displayPropertyTL(value){
    if (value) {
      return value.name;
    }
  }

  onSubmit() {
    console.log("console");

    if (this.option == "TODOS"){
      this.filterBy =  "TODOS";
  }

  if (this.option =="REMISION"){
      this.filterBy =  this.remisionControl.value;

  }
  if (this.option == "FECHA"){
      this.filterBy =  this.fechaControl.value;
  }

  if (this.option == "LOTE"){
    this.filterBy =  this.loteControl.value;
  }

  if(this.option =="LINEA DE TRANSPORTE"){
    this.filterBy =  this.filterBy;
  }
  if(this.option =="PRODUCTO"){
    this.filterBy =  this.filterBy;
  }
  this.calculateRange();

  }

  optionSelectedTypeSearch(event){

    this.option = event.option.value;
    this.disables();
    if (event.option.value =="REMISION"){
      this.remisionVisible = true;
    }

    if (event.option.value == "FECHA"){
        this.fechaVisible = true;
    }

    if (event.option.value == "LOTE"){
      this.loteVisible = true;
    }

    if (event.option.value == "LINEA DE TRANSPORTE"){
    this.transportLineVisible = true;
    }
    if (event.option.value == "PRODUCTO"){
      this.productVisible = true;
      }

  }

  displayPropertyTypeSearch(value){
    if (value) {
      return value;
    }
  }
  disables(){
    this.remisionControl.reset();
    this.fechaControl.reset();
    this.loteControl.reset();
    this.transportLineControl.reset();
    this.productControl.reset();

    this.remisionVisible = false;
    this.fechaVisible = false;
    this.loteVisible = false;
    this.transportLineVisible = false;
    this.productVisible = false;
  }

  save(){
    this.map = new Map()
    var result = this.selection.selected.map(ar => (
    {
      checkOutId: this.checkOutdId,
      checkListId: ar.checkList.id,
      checkOutRemision: this.checkOutRemision,
      remisionIn: ar.checkList.remision,
      pallet: ar,
    }

    ),
 );
    let map = new Map()
      result.forEach((currentValue) => { map.has(currentValue.remisionIn)
       ? map.get(currentValue.remisionIn).push({name: currentValue.remisionIn, pallet: currentValue.pallet})
       : map.set(currentValue.remisionIn, [{name: currentValue.remisionIn, pallet: currentValue.pallet}])
      });

   this.map = map;

   const dialogRef = this.dialog.open(CheckOutPalletComponent, {
    width: '35%',
    data:[this.map,result]
    }).afterClosed().subscribe(data =>{
      if (data) {

        super.calculateRange();
        super.toast("success","Se agregaron correctamente pallets a la remision: " + this.checkOutRemision);
      }
    });
  }


}
