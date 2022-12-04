import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastosRoutingModule } from './gastos-routing.module';
import { GastosComponent } from './gastos-page/gastos.component';
import { GastoFormCreateEditComponent } from './gasto-form-create-edit/gasto-form-create-edit.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    GastosComponent,
    GastoFormCreateEditComponent
  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    MaterialModule
  ],
  exports: [
    GastosComponent,
    GastoFormCreateEditComponent
  ]
})
export class GastosModule { }
