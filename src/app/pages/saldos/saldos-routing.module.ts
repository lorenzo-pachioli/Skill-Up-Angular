import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaldoFormCreateEditComponent } from './saldo-form-create-edit/saldo-form-create-edit.component';
import { SaldosComponent } from './saldos-page/saldos.component';

const routes: Routes = [
  { path: '', component: SaldosComponent },
  { path: 'editar-saldo', component: SaldoFormCreateEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaldosRoutingModule {}
