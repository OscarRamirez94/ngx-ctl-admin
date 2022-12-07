import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard.service';
import { RoleGuard } from '../../guards/role.guard';
import { TransportTypeCapacityComponent } from './transport-type-capacity/transport-type-capacity.component';
import { TransportTypeMainComponent } from './transport-type-main/transport-type-main.component';
import { TransportTypesComponent } from './transport-types.component';

const routes: Routes = [
  {
    path: '',
    component: TransportTypesComponent,
    canActivate: [AuthGuard,RoleGuard],data: { role: ['ROLE_ADMIN','ROLE_SUPER'] },
    children: [
      {
        path: 'transport-types',
        component: TransportTypeMainComponent,
      },
      {
        path: 'capacity/:id',
        component: TransportTypeCapacityComponent,
      }


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportTypesRoutingModule { }
