import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import { CheckList } from '../../../models/check-list/check-list';
import { Pallet } from '../../../models/pallet/pallet';
import { PalletSave2 } from '../../../models/pallet/pallet-save2';
import { Pallett } from '../../../models/pallet/pallett';
import { ResponsePallet } from '../../../models/pallet/ResponsePallet';
import { Product } from '../../../models/product/product';
import { TotalPalletDTO } from '../../../models/totals/total-pallet-dto';
import { Unity } from '../../../models/unity/unity';
import { CheckListService } from '../../../services/check-list/check-list.service';
import { HeadService } from '../../../services/head/head.service';
import { PalletSave2Service } from '../../../services/pallet/pallet-save2';
import { PalletService } from '../../../services/pallet/pallet.service';
import { ProductService } from '../../../services/product/product.service';
import { UnityService } from '../../../services/unity/unity.service';
import { CommonListIdComponent } from '../../commons/common-list/common-list-id.component';
import { CheckListPalletCreateComponent } from '../check-list-pallet-create/check-list-pallet-create.component';
import { CheckListPalletDeleteComponent } from '../check-list-pallet-delete/check-list-pallet-delete.component';


@Component({
  selector: 'ngx-check-list-pallet',
  templateUrl: './check-list-pallet.component.html',
  styleUrls: ['./check-list-pallet.component.scss'],
})
export class CheckListPalletComponent  extends CommonListIdComponent<Pallet,PalletService> implements OnInit   {

  name: string;
  titulo:string = "Pallets";
  displayedColumns: string[] = ['noPallet','name','code','ua','amount','um','lote','expiration','actions'];
  id:any;

  submitted = false;
  actionBtn:String = "Agregar";
  isChecked;
  checkListId;
  palletForm !: FormGroup;
  checkList:CheckList;
  totalCantidad:number = 0;

  disabledTemplate:boolean=true;
  form: FormGroup;
  formTemplate: FormGroup;


  unities:Unity[] = [];
  products:Product[] = [];
  code:string;
  product:Product;
  unity:Unity;
  attachmentArP:Pallett[] = [];
  response:ResponsePallet =  new ResponsePallet();
  totalPalletDTO:TotalPalletDTO = new TotalPalletDTO();
  clientId;
  status;
  step = 0;


  constructor( service:PalletService,router: Router,route: ActivatedRoute,
    private dialog: MatDialog,toastrService: NbToastrService,
    private checkListService:CheckListService,
    private headService:HeadService,
    private fb: FormBuilder,
    private productService:ProductService,
    private unityService:UnityService,
    private palletService:PalletSave2Service,

    ) {
    super(service,router, route,toastrService);
    this.model = new Pallet();
    this.model.id = this.id;
    this.nombreModel = "Pallets";
  }

  ngOnInit(): void {
    super.paginator;
    this.id = +this.route.snapshot.paramMap.get("id");
    this.model.id = +this.route.snapshot.paramMap.get("id");
    this.status = this.route.snapshot.paramMap.get("status");
    this.checkListService.ver(this.id).subscribe(data =>{
      this.checkList = data as CheckList;
    })
    this.clientId =  this.headService.getClientLS();
    super.ngOnInit();
    this.initForm();
    this.getProducts();
    this.getUnities();
    this.template();
    this.calculaTotales();

  }

  initForm(){
    this.form = this.fb.group({
      items: this.fb.array([]),
      checkListId: [this.id]
    });
  }

  template(){
    this.formTemplate = this.fb.group({
      cantidad :['',[RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false }),Validators.required]],
      producto :['',Validators.required],
      codigo :[{ value : '',disabled: true},Validators.required],
    });
  }

  submit() {

    if (this.form.invalid){
      return ;
    }
    let palletSave:PalletSave2 = new PalletSave2();
    palletSave.checkListId = this.id;
    palletSave.palletsDTO =[];
    this.form.value['items'].map(x => palletSave.palletsDTO.push(this.addDTO(x)));

    console.log("datos a guardar", palletSave)
    this.palletService.crear(palletSave).subscribe(data=>{


      super.paginator;
      super.calculateRange();
      this.calculaTotales();
      let error:any = data as any;
      this.response.totalDuplicated = error.totalDuplicated ;
      this.response.totalRegistered = error.totalRegistered ;
      this.response.uas = error.uas ;
      let total =  this.response.totalDuplicated + this.response.totalRegistered;


      if (this.response.totalRegistered>0){
        super.toast("success","Se Agregaron: "+ this.response.totalRegistered + "/" + total +" con éxito");

      }
      if (this.response.totalDuplicated>0){
        super.toast("danger","Se encontraron: "+ this.response.totalDuplicated + "/"+ total + " duplicados");

      }
    });

    this.limpiarPallets();


  }

  addDTO(x:any):Pallet{
    console.log("x", x)
    let pallet:PalletSave2;
    let pallettoDto:Pallet = new Pallet();
    pallettoDto.ua = x.ua;
    pallettoDto.amount = x.amount;
    pallettoDto.expiration =x.expiration;
    pallettoDto.lote = x.lote;
    pallettoDto.noPallet =null;
    pallettoDto.um = x.um;
    pallettoDto.codigo =x.codigo;
    pallettoDto.product = x.producto;
    return pallettoDto;

  }
  addCreds() {
    const formArray = this.form.controls.items as FormArray;
    console.log("***",formArray.value);

    this.attachmentArP.forEach((item) => {
      formArray.push(this.fb.group({
          amount: [item.amount,[RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false }),Validators.required]],
          lote:   ['',Validators.required],
          producto :[this.product,Validators.required],
          codigo :[item.codigo,Validators.required],
          um: ['',Validators.required],
          ua: ['',[RxwebValidators.unique(),Validators.required]],
          expiration: item.expiration,
        }));
    })

  }

  onSubmitTemplate(){
    this.submitted = true;

    if (this.formTemplate.invalid){
      return ;
    }
    this.limpiarPallets();

    let cantidad = this.formTemplate.get('cantidad').value;
    let producto = this.formTemplate.get('producto').value;
    let codigo   = this.formTemplate.get('codigo').value;


    console.log("cantidad", cantidad)
    for (let step = 0; step < cantidad; step++) {

      let pallet:Pallett =  new Pallett();

      pallet.amount = null;
      pallet.lote=null;
      pallet.producto=producto;
      pallet.codigo=codigo;
      pallet.expiration = null;
      pallet.um = null;
      pallet.ua = null;

      this.attachmentArP.push(pallet);
    }
    this.addCreds();
    this.formTemplate.reset();

  }
  limpiarPallets(){

    const arr = <FormArray>this.form.controls.items;
    arr.controls = [];
    this.form.reset();
    this.form.controls.items.reset();
    this.attachmentArP = [];
    this.submitted = false;

    //this.formTemplate.reset();
  }

  resetTemplate(){
    this.limpiarPallets();
    this.formTemplate.reset();
  }

  deleteItem(id:any){
    const add = <FormArray>this.form.controls.items;
    add.removeAt(id)
  }

  getProducts(){
    this.productService.getAllProductsByPartner(this.clientId).subscribe(data =>{
      this.products = data as Product[];
    })
  }
  optionSelectedProduct(event:Product){

    this.code = event.code;
    this.formTemplate?.controls['codigo']?.setValue(this.code);
    this.product = event as Product;
  }
  optionSelectedProductSave(event:Product,id:any){
    this.code = event.code;
    this.product = event as Product;
    const myForm = (<FormArray>this.form.get("items")).at(id);
      myForm.patchValue({
        codigo:event.code
      })
  }

  displayPropertyProduct(value) {
    if (value) {
      return value.name;
    }
  }

  getUnities(){
    this.unityService.getAll().subscribe(data =>{
      this.unities = data as Unity[];
    })
  }

  optionSelectedUMSave(event:Unity,id:any){

    this.unity = event as Unity;

  }

  displayPropertyUM(value) {
    if (value) {
      return value.name;
    }
  }

  temple():Boolean{
    const add = <FormArray>this.form.controls.items;

    if (add.length === 0){
      return false;
    }
    return true;
  }
  calculaTotales(){
    this.service.totalByCheckList(this.id).subscribe(data =>{
      console.log("data",data);
      let data2 :any =  data as any;
      this.totalPalletDTO.total = data2.total;
      this.totalPalletDTO.productoTotal = data2.productoTotal;
      let mapToArray = Array.from(this.totalPalletDTO.productoTotal.values());
      console.log('mapToArray' , mapToArray)
    });
  }

  editDialog(element:any): void {
    const dialogRef = this.dialog.open(CheckListPalletCreateComponent, {
      width: '65%',
      data:element
    }).afterClosed().subscribe(data =>{
      if (data) {
        super.calculateRange();
        this.calculaTotales();
      }
      });
  }

  deleteDialog(element:any): void {
    const dialogRef = this.dialog.open(CheckListPalletDeleteComponent, {
      data:element
    }).afterClosed().subscribe(data =>{
      console.log("data", data);
      if (data) {
        super.calculateRange();
        this.calculaTotales();
      }

      });
  }



}

