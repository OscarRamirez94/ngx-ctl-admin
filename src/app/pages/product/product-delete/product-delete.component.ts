import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Product } from '../../../models/product/product';
import { HeadService } from '../../../services/head/head.service';
import { ProductService } from '../../../services/product/product.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent extends CommonListComponent<Product, ProductService> implements OnInit{

  contentDelete:string;
  isActive :boolean;
  constructor(
    service: ProductService, router: Router, route: ActivatedRoute, toastrService: NbToastrService,
     private  dialogRef: MatDialogRef<ProductDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    headService:HeadService
  ) {
      super(service, router, route,toastrService,headService);
      this.titulo = 'Eliminar Producto';
      this.model = new Product();
      this.redirect = '/pages/clients/clientes';
      this.nombreModel = "Producto";
    }

  ngOnInit(): void {
    this.isActive = this.editData.isActive;
    this.contentDelete = this.editData.name;
  }

  deleteClient(){
    this.model.id = this.editData.id;
    super.delete(this.model.id);
    this.dialogRef.close("true");
  }

}
