import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard.service';
import { HeadClientGuard } from '../../guards/head-client.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ClientMainComponent } from './client-main/client-main.component';
import { ClientsComponent } from './clients.component';




const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    canActivate: [RoleGuard],data: { role: ['ROLE_ADMIN','ROLE_SUPER'] },
    children: [
      {
        path: 'clientes',
        component: ClientMainComponent,
      }

    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }


