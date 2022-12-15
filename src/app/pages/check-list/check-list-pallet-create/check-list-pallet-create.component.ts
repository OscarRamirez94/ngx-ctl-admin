import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Pallet } from '../../../models/pallet/pallet';
import { Product } from '../../../models/product/product';
import { Unity } from '../../../models/unity/unity';
import { HeadService } from '../../../services/head/head.service';
import { PalletSave2Service } from '../../../services/pallet/pallet-save2';
import { PalletService } from '../../../services/pallet/pallet.service';
import { ProductService } from '../../../services/product/product.service';
import { UnityService } from '../../../services/unity/unity.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-check-list-pallet-create',
  templateUrl: './check-list-pallet-create.component.html',
  styleUrls: ['./check-list-pallet-create.component.scss']
})
export class CheckListPalletCreateComponent extends CommonListComponent<Pallet, PalletService> implements OnInit  {

  palletForm !: FormGroup;
  submitted = false;
  actionBtn:String = "Crear";
  isChecked;
  clientId = this.headService.getClientLS();
  unities:Unity[] = [];
  products:Product[] = [];
  code:string;
  product:Product;
  unity:Unity;

  constructor(
    service: PalletService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private formBuilder:FormBuilder, private  dialogRef: MatDialogRef<CheckListPalletCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    headService:HeadService,
    private productService:ProductService,
    private unityService:UnityService
  ) {
      super(service, router, route,toastrService,headService);
      this.titulo = 'Agregar Clients';
      this.model = new Pallet();
      this.redirect = '/pages/clients/clientes';
      this.nombreModel = "Pallet";
    }

  ngOnInit(): void {
    this.getProducts();
    this.getUnities();
    this.setForm();
    this.rejectForm(this.editData);
    super.paginator;
  }

  get f() { return this.palletForm.controls; }

  onSubmit() {

    this.submitted = true;
      // stop here if form is invalid

      if (this.palletForm.invalid) {
          return;
      }
      if (!this.editData) {
         this.modelClient(this.palletForm);
         super.crear();
         this.onReset();
         //super.toast("success","Cliente creado con éxito");
      }  else {
          this.editarClient();
      }
      //notifica

  }

  onReset() {
    this.submitted = false;
    this.palletForm.reset();
    this.editData = null;
    this.dialogRef.close("true");
  }

  setForm() {
    this.palletForm = this.formBuilder.group({
          amount: ['',Validators.required],
          lote:   ['',Validators.required],
          producto :['',Validators.required],
          codigo :[{ value : '',disabled: true},Validators.required],
          um: ['',Validators.required],
          ua: ['',Validators.required],
          expiration:[''],
    });
  }

  rejectForm(editData:any) {
    if (editData) {

      this.actionBtn ="Modificar";
      this.palletForm.controls['amount'].setValue(editData.amount);
      this.palletForm.controls['lote'].setValue(editData.lote);
      this.palletForm.controls['producto'].setValue(editData.product);
      this.palletForm.controls['codigo'].setValue(editData.product.code);
      this.palletForm.controls['um'].setValue(editData.um);
      this.palletForm.controls['ua'].setValue(editData.ua);
      this.palletForm.controls['expiration'].setValue(editData.expiration);
      this.model.id = editData.id;
      this.isChecked = editData.isActive;
    }
  }

  editarClient() {
    this.modelClient(this.palletForm);
    super.editar();
    this.onReset();
    super.toast("success","Pallet modificado con éxito");

  }

  modelClient(clientForm:any) {
    this.model.amount = clientForm.get('amount').value;
    this.model.lote = clientForm.get('lote').value;
    this.model.product = clientForm.get('producto').value;
    this.model.ua = clientForm.get('ua').value;
    this.model.expiration = clientForm.get('expiration').value;
    this.model.um = clientForm.get('um').value;
  }

  getProducts(){
    this.productService.getAllProductsByPartner(this.clientId).subscribe(data =>{
      this.products = data as Product[];
    })
  }
  optionSelectedProduct(event:Product){
    this.product = event as Product;
    this.palletForm.controls['codigo'].setValue(this.product.code);
  }
  optionSelectedProductSave(event:Product){

    this.product = event as Product;
    this.palletForm.controls['codigo'].setValue(this.product.code);
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

  optionSelectedUMSave(event:Unity){

    this.unity = event as Unity;

  }

  displayPropertyUM(value) {
    if (value) {
      return value.name;
    }
  }

}
