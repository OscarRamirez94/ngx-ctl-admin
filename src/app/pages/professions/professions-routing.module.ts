import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessionsMainComponent } from './professions-main/professions-main.component';
import { ProfessionsComponent } from './professions.component';

const routes: Routes = [
  {
    path: '',
    component: ProfessionsComponent,
    children: [
      {
        path: 'professions',
        component: ProfessionsMainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionsRoutingModule { }
