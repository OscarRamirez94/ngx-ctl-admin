import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard.service';
import { HeadClientGuard } from '../../guards/head-client.guard';
import { RoleGuard } from '../../guards/role.guard';
import { InventoryInComponent } from './inventory-in/inventory-in.component';
import { InventoryOutComponent } from './inventory-out/inventory-out.component';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    canActivate: [AuthGuard,HeadClientGuard,RoleGuard],data: { role: ['ROLE_ADMIN','ROLE_SUPER','ROLE_USERS'] },
    children: [
      {
        path: 'inventory-in',
        component: InventoryInComponent,
      },
      {
        path: 'inventory-out',
        component: InventoryOutComponent,
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
