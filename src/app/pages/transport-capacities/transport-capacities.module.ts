import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportCapacitiesRoutingModule } from './transport-capacities-routing.module';
import { TransportCapacitiesComponent } from './transport-capacities.component';
import { TransportCapacityMainComponent } from './transport-capacity-main/transport-capacity-main.component';
import { TransportCapacityCreateComponent } from './transport-capacity-create/transport-capacity-create.component';
import { TransportCapacityDeleteComponent } from './transport-capacity-delete/transport-capacity-delete.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbUserModule } from '@nebular/theme';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { BidiModule } from '@angular/cdk/bidi';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TransportCapacityMainTypeComponent } from './transport-capacity-main-type/transport-capacity-main-type.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    TransportCapacitiesComponent,
    TransportCapacityMainComponent,
    TransportCapacityCreateComponent,
    TransportCapacityDeleteComponent,
    TransportCapacityMainTypeComponent
  ],
  imports: [
    CommonModule,
    TransportCapacitiesRoutingModule,
    ThemeModule,
    NbButtonModule,
    NbCardModule,
    NbActionsModule,
    NbUserModule,
    NbIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    BidiModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatCardModule,
    MatCheckboxModule,
    ngFormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule,
    MatRadioModule,
    MatAutocompleteModule
  ]
})
export class TransportCapacitiesModule { }
