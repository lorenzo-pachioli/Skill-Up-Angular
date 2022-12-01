import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalancesRoutingModule } from './balances-routing.module';
import { BalancesComponent } from './balances-page/balances.component';

@NgModule({
  declarations: [BalancesComponent],
  imports: [CommonModule, BalancesRoutingModule],
})
export class BalancesModule {}
