import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportTypesRoutingModule } from './transport-types-routing.module';
import { TransportTypesComponent } from './transport-types.component';
import { TransportTypeDeleteComponent } from './transport-type-delete/transport-type-delete.component';
import { TransportTypeMainComponent } from './transport-type-main/transport-type-main.component';
import { TransportTypeCreateComponent } from './transport-type-create/transport-type-create.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbActionsModule, NbBadgeModule, NbButtonModule, NbCardModule, NbIconModule, NbSpinnerModule, NbTagModule, NbUserModule } from '@nebular/theme';
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
import { MatStepperModule} from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TransportTypeCapacityComponent } from './transport-type-capacity/transport-type-capacity.component';
import { TransportTypeCapacityCreateComponent } from './transport-type-capacity-create/transport-type-capacity-create.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TransportTypeCapacityDeleteComponent } from './transport-type-capacity-delete/transport-type-capacity-delete.component';
@NgModule({
  declarations: [
    TransportTypesComponent,
    TransportTypeDeleteComponent,
    TransportTypeMainComponent,
    TransportTypeCreateComponent,
    TransportTypeCapacityComponent,
    TransportTypeCapacityCreateComponent,
    TransportTypeCapacityDeleteComponent
  ],
  imports: [
    CommonModule,
    TransportTypesRoutingModule,
    CommonModule,
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
    MatStepperModule,
    MatDividerModule,
    MatTooltipModule,
    NbTagModule,
    MatAutocompleteModule,
    NbBadgeModule,
    NbSpinnerModule
  ]
})
export class TransportTypesModule { }
