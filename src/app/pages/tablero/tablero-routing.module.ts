import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard.service';
import { RoleGuard } from '../../guards/role.guard';
import { TableroMainComponent } from './tablero-main/tablero-main.component';
import { TableroComponent } from './tablero.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard,RoleGuard],data: { role: ['ROLE_ADMIN','ROLE_SUPER'] },
    component: TableroComponent,
    children: [
      {
        path: 'tablero-main',
        component: TableroMainComponent,
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableroRoutingModule { }
