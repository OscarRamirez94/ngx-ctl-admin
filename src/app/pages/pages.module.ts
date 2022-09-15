import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClientsRoutingModule } from './clients/clients-routing.module';
import { AddressRoutingModule } from './address/address-routing.module';
import { ProfessionsRoutingModule } from './professions/professions-routing.module';


@NgModule({
  imports: [
    PagesRoutingModule,
    ClientsRoutingModule,
    AddressRoutingModule,
    ProfessionsRoutingModule,
    ThemeModule,
    NbMenuModule,

  ],
  declarations: [
    PagesComponent,
    NotFoundComponent,

  ],
})
export class PagesModule {
}
