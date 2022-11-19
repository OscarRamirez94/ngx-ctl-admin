import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroMainComponent } from './tablero-main/tablero-main.component';
import { TableroComponent } from './tablero.component';

const routes: Routes = [
  {
    path: '',
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
