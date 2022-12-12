import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InversionesRoutingModule } from './inversiones-routing.module';
import { InversionesComponent } from './inversiones-page/inversiones.component';
import { PlazoFijoComponent } from './plazo-fijo/plazo-fijo.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [InversionesComponent, PlazoFijoComponent],
  imports: [CommonModule, InversionesRoutingModule, MaterialModule, SharedModule],
})
export class InversionesModule {}
