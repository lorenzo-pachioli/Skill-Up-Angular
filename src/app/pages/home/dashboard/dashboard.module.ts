import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from "../../../shared/shared.module";
import { MovimientosModule } from '../../movimientos/movimientos.module';
import { BalancesModule } from '../../balances/balances.module';
import { SaldosModule } from '../../saldos/saldos.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule,
    BalancesModule,
    MovimientosModule,
    SaldosModule
  ]
})
export class DashboardModule { }