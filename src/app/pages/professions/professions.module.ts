import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessionsRoutingModule } from './professions-routing.module';
import { ProfessionsComponent } from './professions.component';
import { ProfessionsMainComponent } from './professions-main/professions-main.component';
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
import { ProfessionsCreateComponent } from './professions-create/professions-create.component';
import { ProfessionsDeleteComponent } from './professions-delete/professions-delete.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ProfessionsComponent,
    ProfessionsMainComponent,
    ProfessionsCreateComponent,
    ProfessionsDeleteComponent
  ],
  imports: [
    CommonModule,
    ProfessionsRoutingModule,
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
    MatRadioModule
  ]
})



export class ProfessionsModule { }
