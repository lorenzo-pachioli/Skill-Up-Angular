import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { DivisasRoutingModule } from './divisas-routing.module';
import { DivisasComponent } from './divisas-page/divisas.component';

@NgModule({
  declarations: [DivisasComponent],
  imports: [CommonModule, DivisasRoutingModule, MaterialModule, FormsModule],
})
export class DivisasModule {}
