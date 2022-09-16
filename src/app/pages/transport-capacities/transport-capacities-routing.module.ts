import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportCapacitiesComponent } from './transport-capacities.component';
import { TransportCapacityMainComponent } from './transport-capacity-main/transport-capacity-main.component';

const routes: Routes = [
  {
    path: '',
    component: TransportCapacitiesComponent,
    children: [
      {
        path: 'transport-capacities',
        component: TransportCapacityMainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportCapacitiesRoutingModule { }
