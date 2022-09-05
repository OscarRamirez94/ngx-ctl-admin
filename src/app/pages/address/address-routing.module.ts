import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressMainComponent } from './address-main/address-main.component';
import { AddressUpdateComponent } from './address-update/address-update.component';
import { AddressComponent } from './address.component';

const routes: Routes = [
  {
    path: '',
    component: AddressComponent,
    children: [
      {
        path: 'address',
        component: AddressMainComponent,
      },
      {
        path: 'address-update',
        component: AddressUpdateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
