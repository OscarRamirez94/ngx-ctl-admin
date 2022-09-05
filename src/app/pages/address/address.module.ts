import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';
import { AddressMainComponent } from './address-main/address-main.component';
import { AddressUpdateComponent } from './address-update/address-update.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbUserModule } from '@nebular/theme';


@NgModule({
  declarations: [
    AddressComponent,
    AddressMainComponent,
    AddressUpdateComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    ThemeModule,
    NbButtonModule,
    NbCardModule,
    NbActionsModule,
    NbUserModule,
    NbIconModule,
  ]
})
export class AddressModule { }
