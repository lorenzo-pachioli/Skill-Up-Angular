import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransaccionesRoutingModule } from './transacciones-routing.module';
import { TransaccionesComponent } from './transacciones-page/transacciones.component';

@NgModule({
  declarations: [TransaccionesComponent],
  imports: [CommonModule, TransaccionesRoutingModule],
})
export class TransaccionesModule {}
