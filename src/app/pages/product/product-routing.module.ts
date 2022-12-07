import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard.service';
import { HeadClientGuard } from '../../guards/head-client.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ProductMainComponent } from './product-main/product-main.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard,HeadClientGuard,RoleGuard],data: { role: ['ROLE_ADMIN','ROLE_SUPER'] },
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
