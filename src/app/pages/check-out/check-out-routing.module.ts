import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutMainComponent } from './check-out-main/check-out-main.component';
import { CheckOutPalletTestComponent } from './check-out-pallet-test/check-out-pallet-test.component';
import { CheckOutPalletComponent } from './check-out-pallet/check-out-pallet.component';
import { CheckOutComponent } from './check-out.component';

const routes: Routes = [
  {
    path: '',
    component: CheckOutComponent,
    children: [
      {
        path: 'checkout',
        component: CheckOutMainComponent,
      },
      {
        path: 'pallet-main/:id/:status',
        component: CheckOutPalletComponent
      },
      {
        path: 'pallet-main-test/:id/:remision',
        component: CheckOutPalletTestComponent
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckOutRoutingModule { }
