import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { map, Observable, startWith } from 'rxjs';
import { HeadService } from '../../../services/head/head.service';
import { PalletService } from '../../../services/pallet/pallet.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { OutUa } from '../../../interfaces/out-ua';
import { CheckOutDetailForm } from '../../../models/check-out-detail/check-out-detail-form';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import { Pallet } from '../../../models/pallet/pallet';
import { CheckList} from '../../../models/check-list/check-list';
import { Product } from '../../../models/product/product';
import { CheckOut } from '../../../models/check-out/check-out';
import { CheckOutDetail } from '../../../models/check-out-detail/check-out-detail';
import { CheckOutDetailRequest } from '../../../models/check-out-detail/check-out-detail-request';
import { CheckOutDeatailService } from '../../../services/check-out-detail/check-out-detail.service';
import { PalletI } from '../../../interfaces/pallet-i';
import { MatTableDataSource } from '@angular/material/table';
import { SearchCriteriaClient } from '../../../models/searchs/search-criteria-client';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { CheckOutDetailDeleteComponent } from '../check-out-detail-delete/check-out-detail-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from '../../../services/toastr/toastr.service';

@Component({
  selector: 'ngx-check-out-pallet-out',
  templateUrl: './check-out-pallet-out.component.html',
  styleUrls: ['./check-out-pallet-out.component.scss']
})
export class CheckOutPalletOutComponent implements OnInit  {

  displayedColumns: string[] = ['remision', 'fechaIngreso','producto','lote','licencia','um','cantidad','stock'];
  checkOutDetailRequest:CheckOutDetailRequest= new CheckOutDetailRequest();
  checkOutId:number;
  checkOutRemision:string;
  nbAuthToken:NbAuthToken;
  authorities:any =[];
  isSuper:boolean = false;
  clientName =  this.headService.getClientLS();
  actionBtn:String = "Siguiente";
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  uas: string[] = [];
  allUas: string[] = [];
  firstFormGroup !: FormGroup;
  opened = false;
  submitted = false;
  outUa :OutUa[] = [];
  loading = false;
  disables = false;
  detailForm !: FormGroup;
  attachmentArP:CheckOutDetailForm[] = [];
  loading2 = false;
  //step 3
  filterValueRegistered ="";
  paginaActualRegistered = 0;
  dataSourceRegistered: MatTableDataSource<PalletI>;
  totalRegistrosRegistered=0;
  totalPorPaginaRegistered = 22;
  orderByRegistered ="ASC";
  columnRegistered ="id";
  pageSizeOptionsRegistered = [22, 44, 66,100];
  listaRegistered: PalletI[];
  displayedColumnsRegistered: string[] = ['remisionSalida','remision','transportLine','name','amount','stock','ua','um','lote','actions'];
  pageSizeOptions = [22, 44, 66,100];
  @ViewChild(MatPaginator)
  paginatorRegistered :MatPaginator;

  @ViewChild(MatSort)
  sortRegistered: MatSort;

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @ViewChild('autocompleteTrigger') matACTrigger: MatAutocompleteTrigger;

  constructor(
    public service: PalletService,
    public router: Router,
    public route: ActivatedRoute,
    private headService:HeadService,
    private authService: NbAuthService,
    private _formBuilder:FormBuilder,
    private detailService:CheckOutDeatailService,
    private dialog: MatDialog,
    private toasterService:ToastrService) {

      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allUas.slice()));

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
    this.getUasDisponibles();
    this.initForm();
    this.calculateRangeRegistered();
  }
  get f() { return this.firstFormGroup.controls; }

  initForm(){
    this.firstFormGroup = this._formBuilder.group({
      uas:['',Validators.required],
     });

  }

hasRole(roles:String[]):Boolean{
    return roles.some(r=> this.authorities.includes(r));

 }

getUasDisponibles(){


  this.service.getUasDisponibles(this.clientName).subscribe({
    next: (data) =>{
      if (data.length===0){
        this.toasterService.toast("success","Licencias","No se encontraron licencias disponibles: ");
      }
      data.map(data => this.allUas.push(data.value))
    },
    error: (e) =>{
      console.error("error",e.error.status)

    },
    complete: () => {

    }
  });
}


remove(ua: string): void {
  const index = this.uas.indexOf(ua);


  if (index >= 0) {
    this.uas.splice(index, 1);
  }
  this.outUasTable();
}

selected(event: MatAutocompleteSelectedEvent): void {
  const newValue = event.option.viewValue;
  if (this.uas.includes(newValue)) {
    this.uas = [...this.uas.filter(fruit=>fruit !== newValue)];
  } else {
    this.uas.push(event.option.viewValue);
  }
  this.fruitInput.nativeElement.value = '';
  this.fruitCtrl.setValue(null);

  // keep the autocomplete opened after each item is picked.
  requestAnimationFrame(()=>{
    this.openAuto(this.matACTrigger);
  })
  this.outUasTable();

}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allUas.filter(fruit => fruit.toLowerCase().indexOf(filterValue) >= 0);
}

openAuto(trigger: MatAutocompleteTrigger) {
  trigger.openPanel();
  this.fruitInput.nativeElement.focus();
  console.log(trigger);
}


outUasTable(){
  this.loading = true;
  this.service.getUasTable(this.clientName, this.uas).subscribe({
    next: (data) =>{
      console.log(data);
      this.outUa = data as OutUa[];
      if (this.outUa.length ===0){
        this.toasterService.toast("success","Licencias","No se encontraron licencias disponibles: ");
      }

    },
    error: (e) =>{
      console.error("error",e.error.status)
      this.loading = false;
    },
    complete: () => {
      this.loading = false;
    }
  });
}

generarFormulario(){
  this.initDetailForm();
  this.outUa.map(p => this.pushForm(p))
  this.addCreds();
}

initDetailForm(){
  this.attachmentArP = [];

  this.detailForm = this._formBuilder.group({
    items: this._formBuilder.array([])
  })
}
pushForm(p:any){
  console.log(p);

  let checkOutDetail:CheckOutDetailForm = new CheckOutDetailForm();
  let pallet:Pallet = new Pallet();
  let checkList:CheckList = new CheckList();
  let product:Product = new Product();

  product.id =  p.productId;
  product.name = p.producto;
  product.code = p.codigo;

  checkList.remision = p.remision;
  checkList.id = p.checkListId;
  checkList.date = p.fechaIngreso;
  pallet.id = p.palletId;
  pallet.amount = p.cantidad;
  pallet.amountStock = p.stock;
  pallet.ua = p.licencia;
  pallet.product = product;
  pallet.checkList = checkList;

  checkOutDetail.amount = p.cantidad;
  checkOutDetail.checkOutId =  this.checkOutId;
  checkOutDetail.pallet =  pallet;

  this.attachmentArP.push(checkOutDetail);
}

addCreds() {
  const formArray = this.detailForm.controls.items as FormArray;
  this.attachmentArP.forEach((item) => {
    formArray.push(this._formBuilder.group({
        remision :[{ value : item.pallet.checkList.remision,disabled: true},Validators.required],
        producto :[{ value : item.pallet.product.name,disabled: true},Validators.required],
        licencia :[{ value : item.pallet.ua,disabled: true},Validators.required],
        date :[{ value : item.pallet.checkList.date,disabled: true},Validators.required],

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

      //this.onResetDetail();
      //this.limpiar()
      this.toasterService.toast("success","Pallet","Se agregaron con éxito pallets a la remision: " + this.checkOutRemision);
      this.router.navigateByUrl('/pages/checkout/checkout');
    },
    error: (e) =>{
      this.toasterService.toast("danger","Error","ocurrio un error");
    },
    complete: () => console.info("complete")
  });

}

removeItem(i:any){
  const add = <FormArray>this.detailForm.controls.items;
  const palletId =add.at(i).get("palletId").value;
  add.removeAt(i)
  this.attachmentArP =  this.attachmentArP.filter(detail =>{
    return detail.pallet.id != palletId;
  })
}

limpiarDeatail(){
  this.attachmentArP = [];
  this.detailForm.reset();
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


//step 3

applyFilterRegistered(event: Event) {
  const fil:string  = (event.target as HTMLInputElement).value;
  if(fil !==null && fil !== ''){
      this.filterValueRegistered = fil;

  } else{
      this.filterValueRegistered ="";

  }

  this.paginaActualRegistered = 0;
  this.calculateRangeRegistered();
}

public calculateRangeRegistered(){

  this.loading2 = true;
  const search: SearchCriteriaClient = new SearchCriteriaClient();
  search.pageNumber = this.paginaActualRegistered;
  search.pageSize = this.totalPorPaginaRegistered;
  search.searchBy =this.filterValueRegistered;
  search.sortBy=this.columnRegistered;
  search.sortDirection =this.orderByRegistered;



  this.service.getFilterCriteriaLiberadosByCheckOut(search,this.clientName,this.checkOutId).subscribe({
  next: (paginator) =>{
    this.listaRegistered = paginator.content as PalletI[];
    this.totalRegistrosRegistered = paginator.totalElements as number;
    this.paginatorRegistered._intl.itemsPerPageLabel ="Registros";
    this.dataSourceRegistered = new MatTableDataSource(this.listaRegistered);
  },
  error: (e) =>{
    this.toasterService.toast("danger","Error","ocurrio un error");
    this.loading2 = false;
  },
  complete: () => {
    this.loading2 = false;
    console.info("complete")
  }
});

}

eliminarPallet(detailId:number,palletId:number){

  const dialogRef = this.dialog.open(CheckOutDetailDeleteComponent, {

  data:[detailId,palletId]
  }).afterClosed().subscribe(data =>{
    if (data) {
      this.calculateRangeRegistered();
      this.toasterService.toast("success","Pallet","Se elimino con éxito");
    }
  });
}

paginarRegistered(event:PageEvent) :void{
  this.paginaActualRegistered = event.pageIndex;
  this.totalPorPaginaRegistered = event.pageSize;
  this.calculateRangeRegistered();
}

sortDataRegisted(sort: Sort) {
  if (!sort.active || sort.direction === '') {
    this.calculateRangeRegistered();
  } else {

    if (sort.direction == "asc"){
      this.orderByRegistered = "ASC";
    }

    if (sort.direction == "desc") {
      this.orderByRegistered ="DESC";
    }
    this.columnRegistered = sort.active;

    this.calculateRangeRegistered();
  }
}
}
