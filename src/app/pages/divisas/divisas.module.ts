import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivisasRoutingModule } from './divisas-routing.module';
import { DivisasComponent } from './divisas-page/divisas.component';

@NgModule({
  declarations: [DivisasComponent],
  imports: [CommonModule, DivisasRoutingModule],
})
export class DivisasModule {}
