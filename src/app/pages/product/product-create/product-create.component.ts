import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Client } from '../../../models/client';
import { Product } from '../../../models/product/product';
import { HeadService } from '../../../services/head/head.service';
import { ProductService } from '../../../services/product/product.service';
import { CommonListClientComponent } from '../../commons/common-list/common-list.component-client';

@Component({
  selector: 'ngx-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent  extends CommonListClientComponent<Product, ProductService> implements OnInit {
  productForm !: FormGroup;
  submitted = false;
  actionBtn: String = "Crear";
  isChecked;
  clientId;
  constructor(
    service: ProductService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
    private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ProductCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    headService:HeadService
  ) {
    super(service, router, route, toastrService,headService);
    this.titulo = 'Producto';
    this.model = new Product();
    this.model.partner = new Client();
    this.redirect = '';
    this.nombreModel = "Producto";
  }

  ngOnInit(): void {
    this.clientId =  this.headService.getClientLS();
    this.setForm();
    this.rejectForm(this.editData);
    super.paginator;
  }

  get f() { return this.productForm.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    if (!this.editData) {
      this.modelTransportLine(this.productForm);
      super.crear();
      this.onReset();
      super.toast("success", "Producto creado con éxito");
    } else {
      this.editarTransportLine();
    }
  }

  onReset() {
    this.submitted = false;
    this.productForm.reset();
    this.editData = null;
    this.dialogRef.close("true");
  }

  setForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      isActive: ['', Validators.required],
    });
  }

  rejectForm(editData: any) {
    if (editData) {
      this.actionBtn = "Modificar";
      this.productForm.controls['name'].setValue(editData.name);
      this.productForm.controls['code'].setValue(editData.code);
      this.productForm.controls['isActive'].setValue(editData.isActive);
      this.model.id = editData.id;
      this.isChecked = editData.isActive;
    }
  }
  editarTransportLine() {
    this.modelTransportLine(this.productForm);
    super.editar();
    this.onReset();
    super.toast("success", "Product modificado con éxito");
  }

  modelTransportLine(productForm: any) {
    this.model.partner.id = this.clientId;
    this.model.name = productForm.get('name').value;
    this.model.code = productForm.get('code').value;
    this.model.isActive = productForm.get('isActive').value;


  }
}
