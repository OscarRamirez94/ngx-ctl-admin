import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckListRoutingModule } from './check-list-routing.module';
import { CheckListComponent } from './check-list.component';
import { CheckListMainComponent } from './check-list-main/check-list-main.component';
import { CheckListCreateComponent } from './check-list-create/check-list-create.component';

import { ThemeModule } from '../../@theme/theme.module';


import { NbAccordionModule, NbActionsModule, NbBadgeModule, NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbTagModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import {BidiModule} from '@angular/cdk/bidi';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { CheckListPalletComponent } from './check-list-pallet/check-list-pallet.component';
import { CheckListPalletCreateComponent } from './check-list-pallet-create/check-list-pallet-create.component';
import { CheckListPalletDeleteComponent } from './check-list-pallet-delete/check-list-pallet-delete.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CheckListDeleteComponent } from './check-list-delete/check-list-delete.component';
import { CheckListPalletValidateComponent } from './check-list-pallet-validate/check-list-pallet-validate.component';
import { CheckListPalletCloseComponent } from './check-list-pallet-close/check-list-pallet-close.component';
@NgModule({
  declarations: [
    CheckListComponent,
    CheckListMainComponent,
    CheckListCreateComponent,
    CheckListPalletComponent,
    CheckListPalletCreateComponent,
    CheckListPalletDeleteComponent,
    CheckListDeleteComponent,
    CheckListPalletValidateComponent,
    CheckListPalletCloseComponent,

  ],
  imports: [
    CommonModule,
    CheckListRoutingModule,
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
    MatProgressSpinnerModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    NbAccordionModule,
    NbBadgeModule,
    NbListModule,
    MatBadgeModule,
    NbTagModule,
    NbTooltipModule
  ]
})
export class CheckListModule { }
