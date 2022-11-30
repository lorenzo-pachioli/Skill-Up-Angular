import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientosRoutingModule } from './movimientos-routing.module';
import { MovimientosComponent } from './movimientos-page/movimientos.component';

@NgModule({
  declarations: [MovimientosComponent],
  imports: [CommonModule, MovimientosRoutingModule],
})
export class MovimientosModule {}
