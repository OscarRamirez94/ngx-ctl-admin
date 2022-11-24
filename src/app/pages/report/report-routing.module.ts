import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportExcelComponent } from './report-excel/report-excel.component';
import { ReportComponent } from './report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    children: [
      {
        path: 'report-excel',
        component:  ReportExcelComponent,
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
