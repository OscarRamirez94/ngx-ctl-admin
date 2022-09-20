import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClientsRoutingModule } from './clients/clients-routing.module';
import { AddressRoutingModule } from './address/address-routing.module';
import { ProfessionsRoutingModule } from './professions/professions-routing.module';
import { TransportLineDeleteComponent } from './transport-lines/transport-line-delete/transport-line-delete.component';
import { TransportLineCreateComponent } from './transport-lines/transport-line-create/transport-line-create.component';
import { TransportLineMainComponent } from './transport-lines/transport-line-main/transport-line-main.component';
import { TransportLinesRoutingModule } from './transport-lines/transport-lines-routing.module';
import { TransportCapacitiesModule } from './transport-capacities/transport-capacities.module';
import { TransportTypesRoutingModule } from './transport-types/transport-types-routing.module';
import { TransportCapacitiesRoutingModule } from './transport-capacities/transport-capacities-routing.module';
import { PersonsRoutingModule } from './persons/persons-routing.module';


@NgModule({
  imports: [
    PagesRoutingModule,
    ClientsRoutingModule,
    AddressRoutingModule,
    ProfessionsRoutingModule,
    PersonsRoutingModule,
    TransportLinesRoutingModule,
    TransportCapacitiesRoutingModule,
    TransportTypesRoutingModule,
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
