import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastosRoutingModule } from './gastos-routing.module';
import { GastosComponent } from './gastos-page/gastos.component';

@NgModule({
  declarations: [GastosComponent],
  imports: [CommonModule, GastosRoutingModule],
})
export class GastosModule {}
