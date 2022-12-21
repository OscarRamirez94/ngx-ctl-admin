import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../../guards/role.guard';
import { CotizacionesMainComponent } from './cotizaciones-main/cotizaciones-main.component';
import { CotizacionesComponent } from './cotizaciones.component';

const routes: Routes = [
  {
    path: '',
    component: CotizacionesComponent,
    canActivate: [RoleGuard],data: { role: ['ROLE_SUPER'] },
    children: [
      {
        path: 'cotizaciones',
        component: CotizacionesMainComponent,
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionesRoutingModule { }
