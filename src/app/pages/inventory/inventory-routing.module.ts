import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryInComponent } from './inventory-in/inventory-in.component';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      {
        path: 'inventory-in',
        component: InventoryInComponent,
      },
      {
        path: 'inventory-out',
        component: InventoryInComponent,
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
