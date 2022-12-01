import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaldosComponent } from './saldos-page/saldos.component';

const routes: Routes = [{ path: '', component: SaldosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaldosRoutingModule {}
