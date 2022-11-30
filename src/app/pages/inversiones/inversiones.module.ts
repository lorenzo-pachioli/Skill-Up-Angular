import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InversionesRoutingModule } from './inversiones-routing.module';
import { InversionesComponent } from './inversiones-page/inversiones.component';

@NgModule({
  declarations: [InversionesComponent],
  imports: [CommonModule, InversionesRoutingModule],
})
export class InversionesModule {}
