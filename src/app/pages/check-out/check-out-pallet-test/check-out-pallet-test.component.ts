import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { PalletI } from '../../../interfaces/pallet-i';
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


  remisionControl = new FormControl('', []);
  fechaControl = new FormControl('', []);
  typeSearchControl = new FormControl('', []);
  loteControl = new FormControl('', []);
  transportLineControl = new FormControl('', []);
  productControl = new FormControl('', []);

  products:Product[] = [];
  transportLines:TransportLine[] = [];

  options: string[] = ['TODOS','REMISION', 'FECHA','LINEA DE TRANSPORTE','PRODUCTO','LOTE'];

  constructor(service: PalletService, router: Router, route: ActivatedRoute,
     private dialog: MatDialog, toastrService: NbToastrService,
     headService:HeadService,
     private productService:ProductService,
     private transportLineService:TransportLineService) {
    super(service, router, route, toastrService,headService);
  }

  ngOnInit(): void {
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

  selection = new SelectionModel<PalletI>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PalletI): string {
    console.log("row", row)
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}
