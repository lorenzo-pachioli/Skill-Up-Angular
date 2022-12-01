import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaldosRoutingModule } from './saldos-routing.module';
import { SaldosComponent } from './saldos-page/saldos.component';

@NgModule({
  declarations: [SaldosComponent],
  imports: [CommonModule, SaldosRoutingModule],
})
export class SaldosModule {}
