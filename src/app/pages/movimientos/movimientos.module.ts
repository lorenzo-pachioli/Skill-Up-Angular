import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientosRoutingModule } from './movimientos-routing.module';
import { MovimientosComponent } from './movimientos-page/movimientos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MovimientoFilterComponent } from './movimiento-filter/movimiento-filter.component';

@NgModule({
  declarations: [MovimientosComponent, MovimientoFilterComponent],
  imports: [CommonModule, MovimientosRoutingModule, SharedModule, MaterialModule],
  exports: [MovimientoFilterComponent, MovimientosComponent]
})
export class MovimientosModule {}
