import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import { map, Observable, startWith } from 'rxjs';
import { ProductoI } from '../../../interfaces/product-i';
import { TransportLineI } from '../../../interfaces/transport-line-i';
import { CheckOutDetail } from '../../../models/check-out-detail/check-out-detail';
import { CheckOutDetailForm } from '../../../models/check-out-detail/check-out-detail-form';
import { CheckOutDetailRequest } from '../../../models/check-out-detail/check-out-detail-request';
import { CheckOut } from '../../../models/check-out/check-out';
import { Pallet } from '../../../models/pallet/pallet';
import { CheckOutDeatailService } from '../../../services/check-out-detail/check-out-detail.service';
import { HeadService } from '../../../services/head/head.service';
import { PalletService } from '../../../services/pallet/pallet.service';
import { ProductService } from '../../../services/product/product.service';
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
  nbAuthToken:NbAuthToken;
  authorities:any =[];
  isSuper:boolean = false;

  searchForm !: FormGroup;
  detailForm !: FormGroup;
  attachmentArP:CheckOutDetailForm[] = [];
  submitted = false;
  loading = false;
  disables = false;
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
  CheckOutDetailRequest
  actionBtn:String = "Buscar";
  name: string;
  titulo: string = "OUT";
  option:string ="TODOS";
  filterBy:string =  "TODOS";
  checkOutId:number;
  checkOutRemision:string;
  displayedColumns: string[] = ['select','id','remision','transportLine','date',
  'name','code','ua','amount','amountStock','um','lote','expiration','actions'];


  displayedColumnsRegistered: string[] = ['remisionSalida','remision','transportLine','name','code','amount','stock','ua','um','lote','actions'];

  checkOutDetail:CheckOutDetail[] = [];
  checkOutDetailRequest:CheckOutDetailRequest= new CheckOutDetailRequest();

  constructor(
    service: PalletService, router: Router, route: ActivatedRoute,private dialog: MatDialog, toastrService: NbToastrService,
    private formBuilder: FormBuilder,headService:HeadService,private detailService:CheckOutDeatailService,
    private transportLineService:TransportLineService,private productService:ProductService,private authService: NbAuthService) {
      super(service, router, route, toastrService,headService);
      this.nombreModel ="Remision";
      this.authService.onTokenChange().subscribe(data =>{
        this.authorities = data.getPayload()['authorities']
    });
    if (this.hasRole(['ROLE_SUPER'])){
      this.isSuper = true;
    };
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

    })
  }

  onSubmit() {

    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

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
        super.toast("success","Se agregaron con éxito pallets a la remision: " + this.checkOutRemision);
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
        super.toast("success","Se agregaron con éxito pallets a la remision: " + this.checkOutRemision);
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
        super.toast("success","Se elimino con éxito el pallet a la remision: " + this.checkOutRemision);
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
  this.attachmentArP.push(checkOutDetail);
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
      // stop here if form is invalid
      if (this.detailForm.invalid) {
          return;
      }

      let checkout:CheckOut = new CheckOut();
      let checkOutDetailDTO:CheckOutDetail[] = [];
      checkout.id= this.checkOutId;
      this.checkOutDetailRequest.checkOut =  checkout;
      this.checkOutDetailRequest.checkOutDetailDTO = checkOutDetailDTO;
      this.detailForm.value['items'].map(x => this.checkOutDetailRequest.checkOutDetailDTO.push(this.addDTO(x)));
      this.detailService.crearDetail(this.checkOutDetailRequest).subscribe({
        next: (v) =>{

          this.onResetDetail();
          this.limpiar()
          super.toast("success","Se agregaron con éxito pallets a la remision: " + this.checkOutRemision);
          this.router.navigateByUrl('/pages/checkout/checkout');
        },
        error: (e) =>{
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

  }
  hasRole(roles:String[]):Boolean{
    return roles.some(r=> this.authorities.includes(r));
 }
}
