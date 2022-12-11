import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaldosRoutingModule } from './saldos-routing.module';
import { SaldosComponent } from './saldos-page/saldos.component';
import { SaldoFormCreateEditComponent } from './saldo-form-create-edit/saldo-form-create-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [SaldosComponent, SaldoFormCreateEditComponent, DialogComponent],
  imports: [
    CommonModule,
    SaldosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [SaldosComponent]
})
export class SaldosModule {}
