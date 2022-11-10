import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoleGuard } from '../guards/role.guard';
import { HeadClientGuard } from '../guards/head-client.guard';




const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module')
        .then(m => m.DashboardModule),
    },

    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },

    {
      path: 'clients',
      loadChildren: () => import('./clients/clients.module')
        .then(m => m.ClientsModule),
    },
    {
      path: 'transport-lines',
      loadChildren: () => import('./transport-lines/transport-lines.module')
        .then(m => m.TransportLinesModule),
    },
    {
      path: 'transport-types',
      loadChildren: () => import('./transport-types/transport-types.module')
        .then(m => m.TransportTypesModule),
    },
    {
      path: 'address',
      loadChildren: () => import('./address/address.module')
        .then(m => m.AddressModule),
    },
    {
      path: 'professions',
      loadChildren: () => import('./professions/professions.module')
        .then(m => m.ProfessionsModule),
    },
    {
      path: 'product',
      loadChildren: () => import('./product/product.module')
        .then(m => m.ProductModule),
    },
    {
      path: 'persons',
      loadChildren: () => import('./persons/persons.module')
        .then(m => m.PersonsModule),
    },
    {
      path: 'checklist',
      canActivate: [RoleGuard,HeadClientGuard],
      data: { role: 'ROLE_ADMIN' },
      loadChildren: () => import('./check-list/check-list.module')
        .then(m => m.CheckListModule),
    },
    {
      path: 'checkout',
      //canActivate: [RoleGuard,HeadClientGuard],
      data: { role: 'ROLE_ADMIN' },
      loadChildren: () => import('./check-out/check-out.module')
        .then(m => m.CheckOutModule),
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'init',

      loadChildren: () => import('./init/init.module')
        .then(m => m.InitModule),
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
