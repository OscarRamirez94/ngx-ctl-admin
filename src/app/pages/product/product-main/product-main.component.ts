import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Product } from '../../../models/product/product';
import { HeadService } from '../../../services/head/head.service';
import { ProductService } from '../../../services/product/product.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';
import { CommonListClientComponent } from '../../commons/common-list/common-list.component-client';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';

@Component({
  selector: 'ngx-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss']
})
export class ProductMainComponent extends CommonListClientComponent<Product, ProductService>
implements OnInit  {


  name: string;
  titulo: string = "Productos";
  displayedColumns: string[] = ['name','code', 'isActive', 'actions'];
  clientName =  this.headService.getClientLS();
  constructor(service: ProductService, router: Router, route: ActivatedRoute,
     private dialog: MatDialog, toastrService: NbToastrService,
     headService:HeadService) {
    super(service, router, route, toastrService,headService);
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      width: '35%'
    }).afterClosed().subscribe(data => {

      if (data) {
        super.calculateRange(this.clientName);
      }
    });
  }

  editProduct(element: any) {

    this.dialog.open(ProductCreateComponent, {
      width: '35%',
      data: element,

    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange(this.clientName);
      }
    })
  }

  deleteProduct(element: any) {
    this.dialog.open(ProductDeleteComponent, {
      width: '25%',
      data: element
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange(this.clientName);
      }
    })
  }

}
