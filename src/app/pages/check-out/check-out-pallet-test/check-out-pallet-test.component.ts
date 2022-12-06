import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import { map, Observable, startWith } from 'rxjs';
import { ProductoI } from '../../../interfaces/product-i';
import { TransportLineI } from '../../../interfaces/transport-line-i';
import { CheckOutDetail } from '../../../models/check-out-detail/check-out-detail';
import { CheckOutDetailForm } from '../../../models/check-out-detail/check-out-detail-form';
import { CheckOut } from '../../../models/check-out/check-out';
import { Pallet } from '../../../models/pallet/pallet';
import { CheckOutDeatailService } from '../../../services/check-out-detail/check-out-detail.service';
import { HeadService } from '../../../services/head/head.service';
import { PalletService } from '../../../services/pallet/pallet.service';
import { ProductService } from '../../../services/product/product.service';
import { ReportService } from '../../../services/report/report.service';
import { TransportLineService } from '../../../services/transport-line/transport-line.service';
import { CommonListPalletComponent } from '../../commons/common-list/common-list.component-pallet';
import { CheckOutDetailDeleteComponent } from '../check-out-detail-delete/check-out-detail-delete.component';
import { CheckOutDetailComponent } from '../check-out-detail/check-out-detail.component';
import { CheckOutPalletComponent } from '../check-out-pallet/check-out-pallet.component';

@Component({
  selector: 'ngx-check-out-pallet-test',
  templateUrl: './check-out-pallet-test.component.html',
  styleUrls: ['./check-out-pallet-test.component.scss']
})
export class CheckOutPalletTestComponent extends CommonListPalletComponent<Pallet, PalletService> implements OnInit  {
  searchForm !: FormGroup;
  detailForm !: FormGroup;
  attachmentArP:CheckOutDetailForm[] = [];
  submitted = false;
  loading = false;
  disables = true;
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
  checkOutId:number;
  checkOutRemision:string;
  displayedColumns: string[] = ['select','id','remision','transportLine','date',
  'name','code','ua','amount','amountStock','um','lote','expiration','actions'];


  displayedColumnsRegistered: string[] =  ['remision','transportLine','name','code','amount','stock','ua','um','lote'];

  checkOutDetail:CheckOutDetail[] = [];

  constructor(
    service: PalletService, router: Router, route: ActivatedRoute,private dialog: MatDialog, toastrService: NbToastrService,
    private formBuilder: FormBuilder,private reportService:ReportService,headService:HeadService,private detailService:CheckOutDeatailService,
    private transportLineService:TransportLineService,private productService:ProductService) {
      super(service, router, route, toastrService,headService);
     }



  ngOnInit(): void {
    this.checkOutId  = +this.route.snapshot.paramMap.get("id");
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
      checkOutId: this.checkOutId,
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
    this.detailForm.reset;
    this.attachmentArP = [];
  }

  salidaPallet(element :any){

    const dialogRef = this.dialog.open(CheckOutDetailComponent, {

    data:[element,this.checkOutId]
    }).afterClosed().subscribe(data =>{
      if (data) {

        super.calculateRange();
        super.calculateRangeRegistered();
        super.toast("success","Se agregaron correctamente pallets a la remision: " + this.checkOutRemision);
      }
    });
  }

  eliminarPallet(detailId:number,palletId:number){

    const dialogRef = this.dialog.open(CheckOutDetailDeleteComponent, {

    data:[detailId,palletId]
    }).afterClosed().subscribe(data =>{
      if (data) {

        super.calculateRange();
        super.calculateRangeRegistered();
        super.toast("success","Se Elimino correctamente el pallet a la remision: " + this.checkOutRemision);
      }
    });
  }

generarFormulario(){
    this.initDetailForm();
    this.selection.selected.map(ar => this.pushForm(ar));
    this.addCreds();
}

limpiarDeatail(){
  this.attachmentArP = [];
  this.detailForm.reset();
}

pushForm(ar:any){
  let checkOutDetail:CheckOutDetailForm = new CheckOutDetailForm();
  let pallet:Pallet = new Pallet();
  pallet = ar;

  checkOutDetail.amount = ar.amount;
  checkOutDetail.checkOutId =  this.checkOutId;
  checkOutDetail.pallet =  pallet;


  console.log("checkoutDetail",checkOutDetail);

  this.attachmentArP.push(checkOutDetail);
  console.info("checkout size",this.attachmentArP.length);
}
  initDetailForm(){
    this.attachmentArP = [];
    this.searchForm.reset();
    this.detailForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    })
  }

  addCreds() {
    const formArray = this.detailForm.controls.items as FormArray;
    console.log("***",formArray.value);

    this.attachmentArP.forEach((item) => {
      formArray.push(this.formBuilder.group({

          remision: [item.pallet.checkList.remision,[Validators.required]],
          producto: [item.pallet.product.name,[Validators.required]],
          licencia: [item.pallet.ua,[Validators.required]],
          date: [item.pallet.checkList.date,[Validators.required]],
          amount: [item.pallet.amountStock,
            [
              RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false }),
              RxwebValidators.required(),
              RxwebValidators.maxNumber({value:item.pallet.amountStock })
            ]

          ],
          checkListId: [item.pallet.checkList.id,Validators.required],
          checkOutId: [item.checkOutId,Validators.required],
          palletId :[item.pallet.id,Validators.required],
        }));
    })

  }

  removeItem(i:any){
    const add = <FormArray>this.detailForm.controls.items;
    const palletId =add.at(i).get("palletId").value;
    add.removeAt(i)
    this.attachmentArP =  this.attachmentArP.filter(detail =>{
      return detail.pallet.id != palletId;
    })
  }

  onSubmitDetail(){
    console.log("console",this.detailForm.value);
      // stop here if form is invalid
      if (this.detailForm.invalid) {
          return;
      }
      console.log("true")
      this.detailForm.value['items'].map(x => this.checkOutDetail.push(this.addDTO(x)));
      console.log("data a guardar", this.checkOutDetail);

      this.detailService.crear(this.checkOutDetail).subscribe({
        next: (v) =>{
          this.onResetDetail();
          this.limpiar()
        },
        error: (e) =>{
          console.error("error",e.error.status)
          this.toast("Error", "Ocurrio un error");
        },
        complete: () => console.info("complete")
      });

  }

  addDTO(checkOutDetailForm:any ){
    let pallet:Pallet = new Pallet();
    let checkout:CheckOut= new CheckOut();

    pallet.id =   checkOutDetailForm.palletId;
    checkout.id = checkOutDetailForm.checkOutId;

    let checkOutDetail:CheckOutDetail= new CheckOutDetail();
    checkOutDetail.amount = checkOutDetailForm.amount;
    checkOutDetail.checkOut = checkout;
    checkOutDetail.pallet = pallet;
    checkOutDetail.checkListId =checkOutDetailForm.checkListId;
    return checkOutDetail;

  }

  onResetDetail(){
    this.detailForm.reset();
    this.attachmentArP =[];
    this.checkOutDetail =[];
    this.calculateRangeRegistered();
  }
}
