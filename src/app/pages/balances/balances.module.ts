import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalancesRoutingModule } from './balances-routing.module';
import { BalancesComponent } from './balances-page/balances.component';
import { BalanceInfoComponent } from './balance-info/balance-info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    BalancesComponent,
    BalanceInfoComponent,
  ],
  imports: [
    CommonModule,
    BalancesRoutingModule,
    SharedModule,
    MaterialModule
  ],
})
export class BalancesModule { }
