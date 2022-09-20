
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsMainComponent } from './persons-main/persons-main.component';
import { PersonsComponent } from './persons.component';




const routes: Routes = [
  {
    path: '',
    component: PersonsComponent,
    children: [
      {
        path: 'persons',
        component: PersonsMainComponent,
      }

    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
