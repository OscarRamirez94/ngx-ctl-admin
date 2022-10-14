import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './users-create/users-create.component';
import { UsersMainComponent } from './users-main/users-main.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
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
      {
        path: 'users-profile',
        component: UsersProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
