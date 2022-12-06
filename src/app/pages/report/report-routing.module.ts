import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard.service';
import { HeadClientGuard } from '../../guards/head-client.guard';
import { ReportExcelComponent } from './report-excel/report-excel.component';
import { ReportComponent } from './report.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard,HeadClientGuard],
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
