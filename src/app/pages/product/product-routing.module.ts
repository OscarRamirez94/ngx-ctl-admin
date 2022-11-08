import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard.service';
import { HeadClientGuard } from '../../guards/head-client.guard';
import { ProductMainComponent } from './product-main/product-main.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard,HeadClientGuard],
    component: ProductComponent,
    children: [
      {
        path: 'product',
        component: ProductMainComponent,
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
