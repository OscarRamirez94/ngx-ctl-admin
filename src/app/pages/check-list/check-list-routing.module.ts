import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard.service';
import { HeadClientGuard } from '../../guards/head-client.guard';
import { CheckListCreateComponent } from './check-list-create/check-list-create.component';
import { CheckListMainComponent } from './check-list-main/check-list-main.component';
import { CheckListPalletComponent } from './check-list-pallet/check-list-pallet.component';
import { CheckListComponent } from './check-list.component';


const routes: Routes = [
  {
    path: '',
    component: CheckListComponent,
    canActivate: [AuthGuard,HeadClientGuard],
    children: [
      {
        path: 'checklist',
        component: CheckListMainComponent,
      },
      {
        path: 'checklist-create',
        component: CheckListCreateComponent,
      },
      {
        path: 'pallet-main/:id/:status',
        component: CheckListPalletComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckListRoutingModule { }
