import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
    //   {
    //     path: 'inputs',
    //     component: FormInputsComponent,
    //   },
    //   {
    //     path: 'layouts',
    //     component: FormLayoutsComponent,
    //   },
    //   {
    //     path: 'layouts',
    //     component: FormLayoutsComponent,
    //   },
    //   {
    //     path: 'buttons',
    //     component: ButtonsComponent,
    //   },
    //   {
    //     path: 'datepicker',
    //     component: DatepickerComponent,
    //   },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class DashboardRoutingModule {
}

