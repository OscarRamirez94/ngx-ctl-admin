import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutMainComponent } from './check-out-main/check-out-main.component';
import { CheckOutComponent } from './check-out.component';

const routes: Routes = [
  {
    path: '',
    component: CheckOutComponent,
    children: [
      {
        path: 'checkout',
        component: CheckOutMainComponent,
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckOutRoutingModule { }
