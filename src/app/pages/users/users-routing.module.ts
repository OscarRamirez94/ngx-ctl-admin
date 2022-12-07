import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard.service';
import { RoleGuard } from '../../guards/role.guard';
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
        canActivate: [AuthGuard,RoleGuard],data: { role: ['ROLE_ADMIN','ROLE_SUPER'] },
        component: UsersMainComponent,
      },
      {
        path: 'users-profile',
        canActivate: [AuthGuard,RoleGuard],data: { role: ['ROLE_ADMIN','ROLE_SUPER','ROLE_USERS'] },
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
