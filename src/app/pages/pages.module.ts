import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClientsRoutingModule } from './clients/clients-routing.module';
import { AddressRoutingModule } from './address/address-routing.module';
import { ProfessionsRoutingModule } from './professions/professions-routing.module';
import { TransportLinesRoutingModule } from './transport-lines/transport-lines-routing.module';
import { TransportTypesRoutingModule } from './transport-types/transport-types-routing.module';
import { PersonsRoutingModule } from './persons/persons-routing.module';
import { CheckListRoutingModule } from './check-list/check-list-routing.module';
import { UsersRoutingModule } from './users/users-routing.module';


@NgModule({
  imports: [
    PagesRoutingModule,
    ClientsRoutingModule,
    AddressRoutingModule,
    ProfessionsRoutingModule,
    UsersRoutingModule,
    PersonsRoutingModule,
    TransportLinesRoutingModule,
    TransportTypesRoutingModule,
    CheckListRoutingModule,
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
