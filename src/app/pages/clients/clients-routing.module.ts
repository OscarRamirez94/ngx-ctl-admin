import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientMainComponent } from './client-main/client-main.component';
import { ClientUpdateComponent } from './client-update/client-update.component';
import { ClientsComponent } from './clients.component';




const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      {
        path: 'clientes',
        component: ClientMainComponent,
      },
      {
        path: 'update',
        component: ClientUpdateComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }


