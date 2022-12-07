import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard.service';
import { RoleGuard } from '../../guards/role.guard';
import { ProfessionMainComponent } from './profession-main/profession-main.component';
import { ProfessionsComponent } from './professions.component';

const routes: Routes = [
  {
    path: '',
    component: ProfessionsComponent,
    canActivate: [AuthGuard,RoleGuard],data: { role: ['ROLE_ADMIN','ROLE_SUPER'] },
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
