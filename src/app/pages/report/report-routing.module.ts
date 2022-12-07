import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard.service';
import { HeadClientGuard } from '../../guards/head-client.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ReportExcelComponent } from './report-excel/report-excel.component';
import { ReportComponent } from './report.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard,HeadClientGuard,RoleGuard],data: { role: ['ROLE_ADMIN','ROLE_SUPER'] },
    component: ReportComponent,
    children: [
      {

        path: 'report-excel',
        component:  ReportExcelComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
