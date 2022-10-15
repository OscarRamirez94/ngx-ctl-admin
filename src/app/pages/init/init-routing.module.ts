import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitMainComponent } from './init-main/init-main.component';
import { InitComponent } from './init.component';

const routes: Routes = [
  {
    path: '',
    component: InitComponent,
    children: [
      {
        path: 'init',
        component: InitMainComponent,
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitRoutingModule { }
