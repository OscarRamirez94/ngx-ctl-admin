import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersMainComponent } from './users-main/users-main.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'users',
        component: UsersMainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }