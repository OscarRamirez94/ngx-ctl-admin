import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard.service';
import { CheckListCreateComponent } from './check-list-create/check-list-create.component';
import { CheckListMainComponent } from './check-list-main/check-list-main.component';
import { CheckListComponent } from './check-list.component';

const routes: Routes = [
  {
    path: '',
    component: CheckListComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'checklist',
        component: CheckListMainComponent,
      },
      {
        path: 'checklist-create',
        component: CheckListCreateComponent,
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckListRoutingModule { }
