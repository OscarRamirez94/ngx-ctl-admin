import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessionMainComponent } from './profession-main/profession-main.component';
import { ProfessionsComponent } from './professions.component';

const routes: Routes = [
  {
    path: '',
    component: ProfessionsComponent,
    children: [
      {
        path: 'professions',
        component: ProfessionMainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionsRoutingModule { }
