import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { ClientsComponent } from './clients.component';

import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbUserModule } from '@nebular/theme';
import { ClientMainComponent } from './client-main/client-main.component';
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
import { ClientCreateComponent } from './client-create/client-create.component';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { ClientDeleteComponent } from './client-delete/client-delete.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    ClientsComponent,
    ClientDeleteComponent,
    ClientCreateComponent,
    ClientMainComponent,

  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
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
  ],

})
export class ClientsModule { }
