import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableroRoutingModule } from './tablero-routing.module';
import { TableroComponent } from './tablero.component';
import { TableroMainComponent } from './tablero-main/tablero-main.component';
import { ThemeModule } from '../../@theme/theme.module';


import { NbActionsModule, NbBadgeModule, NbButtonModule, NbCardModule, NbIconModule, NbTagModule, NbUserModule } from '@nebular/theme';

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
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    TableroComponent,
    TableroMainComponent
  ],
  imports: [
    CommonModule,
    TableroRoutingModule,
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
    NbTagModule,
    NbBadgeModule,
    NgxChartsModule,
    NbCardModule,
  ]
})
export class TableroModule { }
