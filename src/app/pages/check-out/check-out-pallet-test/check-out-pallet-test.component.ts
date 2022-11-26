import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { json } from '@rxweb/reactive-form-validators';
import { map, Observable, startWith } from 'rxjs';
import { PalletI } from '../../../interfaces/pallet-i';
import { ProductoI } from '../../../interfaces/product-i';
import { TransportLineI } from '../../../interfaces/transport-line-i';
import { CheckOutSave } from '../../../models/check-out/CheckOutSave';
import { Pallet } from '../../../models/pallet/pallet';
import { Product } from '../../../models/product/product';
import { TransportLine } from '../../../models/transport-line/transport-line';
import { HeadService } from '../../../services/head/head.service';
import { PalletService } from '../../../services/pallet/pallet.service';
import { ProductService } from '../../../services/product/product.service';
import { ReportService } from '../../../services/report/report.service';
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
  searchForm !: FormGroup;
  submitted = false;
  loading = false;
  fechaVisible:boolean=false;
  remisionVisible:boolean=false;
  transportLineVisible:boolean=false;
  productVisible:boolean=false;
  loteVisible:boolean=false;

  transportLines:TransportLineI[] = [];
  filteredTransportLines: Observable<TransportLineI[]>;

  products:ProductoI[] = [];
  filteredProduct: Observable<ProductoI[]>;


  options: string[] = ['TODOS','REMISION', 'FECHA','LINEA DE TRANSPORTE','PRODUCTO','LOTE'];
  clientName =  this.headService.getClientLS();

  actionBtn:String = "Buscar";
  name: string;
  titulo: string = "OUT";
  option:string ="TODOS";
  filterBy:string =  "TODOS";
  checkOutdId:number;
  checkOutRemision:string;
  displayedColumns: string[] = ['select','id','remision','transportLine','date','name','code','ua','amount','um','lote','expiration'];

  constructor(
    service: PalletService, router: Router, route: ActivatedRoute,private dialog: MatDialog, toastrService: NbToastrService,
    private formBuilder: FormBuilder,private reportService:ReportService,headService:HeadService,
    private transportLineService:TransportLineService,private productService:ProductService) {
      super(service, router, route, toastrService,headService);
     }



  ngOnInit(): void {
    this.checkOutdId  = +this.route.snapshot.paramMap.get("id");
    this.checkOutRemision = this.route.snapshot.paramMap.get("remision");

    this.setForm();
    this.getTransportLines();
    this.getListProduct();
    super.ngOnInit();
  }
  get f() { return this.searchForm.controls; }

  getTransportLines(){
    this.transportLineService.getAllTLByPartner(this.clientName).subscribe(data =>{
      this.transportLines = data as TransportLineI[];
    })
  }

  getListProduct(){
    this.productService.getAllProductsByPartner(this.clientName).subscribe(data =>{
      this.products = data as ProductoI[];
      console.log("producto" +  this.products)
    })
  }

  onSubmit() {

    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }
    console.log("is valid form");
    this.loading = true;
    let name :string = "Report.xls";
    if (this.option ==="TODOS"){
      this.filterBy = "TODOS";
    }
    if (this.option ==="FECHA"){
      let date = this.searchForm.get('date').value;
      this.filterBy = date;
    }
    if (this.option ==="REMISION"){
      let remision = this.searchForm.get('remision').value;
      this.filterBy = remision;
    }
    if (this.option ==="LINEA DE TRANSPORTE"){
      this.filterBy = this.filterBy;
    }
    if (this.option ==="PRODUCTO"){

      this.filterBy = this.filterBy;
    }
    if (this.option ==="LOTE"){
      let lote = this.searchForm.get('lote').value;
      this.filterBy = lote;
    }
    this.calculateRange();
    this.onReset();


  }

  onReset() {
    this.submitted = false;
    this.searchForm.reset();
    this.searchForm.controls.date.clearValidators();
    this.searchForm.controls.date.updateValueAndValidity();


    this.searchForm.controls.remision.clearValidators();
    this.searchForm.controls.remision.updateValueAndValidity();
    this.searchForm.controls.product.clearValidators();
    this.searchForm.controls.product.updateValueAndValidity();

    this.searchForm.controls.transportLine.clearValidators();
    this.searchForm.controls.transportLine.updateValueAndValidity();
    this.searchForm.controls.lote.clearValidators();
    this.searchForm.controls.lote.updateValueAndValidity();


    this.fechaVisible=false;
    this.remisionVisible = false;
    this.transportLineVisible=false;
    this.productVisible = false;
    this.loteVisible = false;
    this.loading = false;
    this.filterBy = null;
  }

  setForm() {
    this.searchForm = this.formBuilder.group({
      typeSearchControl: ['', Validators.required],
      date: ['',],
      remision: ['',],
      transportLine: ['',],
      product: ['',],
      lote: ['',],
    });


  }

  optionSelectedTypeSearch(event){
    this.option = event.option.value;
    console.log("1",event.option.value);
    this.option = event.option.value;
    if (event.option.value ==="TODOS"){
      this.searchForm.controls.date.clearValidators();
      this.searchForm.controls.date.updateValueAndValidity();

      this.searchForm.controls.remision.clearValidators();
      this.searchForm.controls.remision.updateValueAndValidity();

      this.searchForm.controls.transportLine.clearValidators();
      this.searchForm.controls.transportLine.updateValueAndValidity();

      this.searchForm.controls.product.clearValidators();
      this.searchForm.controls.product.updateValueAndValidity();

      this.searchForm.controls.lote.clearValidators();
      this.searchForm.controls.lote.updateValueAndValidity();

      this.fechaVisible=false;
      this.remisionVisible = false;
      this.transportLineVisible=false;
      this.productVisible = false;
      this.loteVisible = false;

    }

    if (event.option.value ==="FECHA"){
        this.remisionVisible = false;
        this.fechaVisible=true;
        this.transportLineVisible=false;
        this.productVisible = false;
        this.loteVisible = false;

        this.searchForm.controls.date.addValidators(Validators.required);
        this.searchForm.controls.date.updateValueAndValidity();


        this.searchForm.controls.remision.clearAsyncValidators();
        this.searchForm.controls.remision.updateValueAndValidity();

        this.searchForm.controls.transportLine.clearValidators();
        this.searchForm.controls.transportLine.updateValueAndValidity();

        this.searchForm.controls.product.clearValidators();
        this.searchForm.controls.product.updateValueAndValidity();

        this.searchForm.controls.lote.clearValidators();
        this.searchForm.controls.lote.updateValueAndValidity();

    }


  if (event.option.value ==="REMISION"){
    this.remisionVisible = true;
    this.fechaVisible=false;
    this.transportLineVisible=false;
    this.productVisible = false;
    this.loteVisible = false;

    this.searchForm.controls.remision.addValidators(Validators.required);
      this.searchForm.controls.remision.updateValueAndValidity();

      this.searchForm.controls.date.clearValidators();
      this.searchForm.controls.date.updateValueAndValidity();


      this.searchForm.controls.transportLine.clearValidators();
      this.searchForm.controls.transportLine.updateValueAndValidity();

      this.searchForm.controls.product.clearValidators();
      this.searchForm.controls.product.updateValueAndValidity();

      this.searchForm.controls.lote.clearValidators();
      this.searchForm.controls.lote.updateValueAndValidity();
  }

  if (event.option.value ==="LINEA DE TRANSPORTE"){
    this.remisionVisible = false;
    this.fechaVisible=false;
    this.transportLineVisible=true;
    this.productVisible = false;
    this.loteVisible = false;

    this.searchForm.controls.transportLine.addValidators(Validators.required);
    this.searchForm.controls.transportLine.updateValueAndValidity();

    this.searchForm.controls.date.clearValidators();
    this.searchForm.controls.date.updateValueAndValidity();

      this.searchForm.controls.remision.clearValidators();
      this.searchForm.controls.remision.updateValueAndValidity();

      this.searchForm.controls.product.clearValidators();
      this.searchForm.controls.product.updateValueAndValidity();

      this.searchForm.controls.lote.clearValidators();
      this.searchForm.controls.lote.updateValueAndValidity();

      this.filteredTransportLines = this.searchForm.get("transportLine").valueChanges.pipe(
        startWith(null),
        map(transportLine => (transportLine ? this._filterTransportLine(transportLine) : this.transportLines.slice())),
      );
  }

  if (event.option.value ==="PRODUCTO"){

    this.remisionVisible = false;
    this.fechaVisible=false;
    this.transportLineVisible=false;
    this.productVisible = true;
    this.loteVisible = false;

    this.searchForm.controls.product.addValidators(Validators.required);
    this.searchForm.controls.product.updateValueAndValidity();

    this.searchForm.controls.date.clearValidators();
    this.searchForm.controls.date.updateValueAndValidity();


    this.searchForm.controls.remision.clearValidators();
    this.searchForm.controls.remision.updateValueAndValidity();

    this.searchForm.controls.transportLine.clearValidators();
    this.searchForm.controls.transportLine.updateValueAndValidity();

    this.searchForm.controls.lote.clearValidators();
    this.searchForm.controls.lote.updateValueAndValidity();

    this.filteredProduct = this.searchForm.get("product").valueChanges.pipe(
      startWith(null),
      map(producto => (producto ? this._filterProduct(producto) : this.products.slice())),
    );

  }

  if (event.option.value ==="LOTE"){
    this.remisionVisible = false;
    this.fechaVisible=false;
    this.transportLineVisible=false;
    this.productVisible = false;
    this.loteVisible = true;

    this.searchForm.controls.lote.addValidators(Validators.required);
    this.searchForm.controls.lote.updateValueAndValidity();

    this.searchForm.controls.date.clearValidators();
    this.searchForm.controls.date.updateValueAndValidity();

    this.searchForm.controls.remision.clearValidators();
    this.searchForm.controls.remision.updateValueAndValidity();

    this.searchForm.controls.transportLine.clearValidators();
    this.searchForm.controls.transportLine.updateValueAndValidity();

    this.searchForm.controls.remision.clearValidators();
    this.searchForm.controls.remision.updateValueAndValidity();

    this.searchForm.controls.product.clearValidators();
    this.searchForm.controls.product.updateValueAndValidity();
  }

  }

  displayPropertyTypeSearch(value){
    if (value) {
      return value;
    }
  }


  // filtered TransportLines
  private _filterTransportLine(value: string): TransportLineI[] {
      const filterValue = value.toString().toLowerCase();
      return this.transportLines.filter(transportLine => transportLine.name.toLowerCase().includes(filterValue));
  }
  optionSelectedTransportLine(event:TransportLineI){
    this.filterBy =  event.id.toString();
  }
  displayPropertyTransportLine(value) {
    if (value) {
      return value.name;
    }
  }
  // filtered producto
  private _filterProduct(value: string): ProductoI[] {
    const filterValue = value.toString().toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(filterValue)
    );
}

  optionSelectedProduct(event:ProductoI){
    this.filterBy =  event.id.toString();
  }
  displayPropertyProduct(value) {
    if (value) {
      return value.name;
    }
  }

  //save pallets

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

    data:[this.map,result]
    }).afterClosed().subscribe(data =>{
      if (data) {

        super.calculateRange();
        super.toast("success","Se agregaron correctamente pallets a la remision: " + this.checkOutRemision);
      }
    });
  }

  limpiar(){
    this.filterBy = "TODOS";
    this.option = "TODOS";
    this.calculateRange();
    this.loading = false;
  }
}
