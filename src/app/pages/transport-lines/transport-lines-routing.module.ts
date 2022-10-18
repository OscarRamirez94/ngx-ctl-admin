import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard.service';
import { HeadClientGuard } from '../../guards/head-client.guard';
import { TransportLineMainComponent } from './transport-line-main/transport-line-main.component';
import { TransportLinesComponent } from './transport-lines.component';

const routes: Routes = [
  {
    path: '',
    component: TransportLinesComponent,
    canActivate: [AuthGuard,HeadClientGuard],
    children: [
      {
        path: 'transport-lines',
        component: TransportLineMainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportLinesRoutingModule { }
