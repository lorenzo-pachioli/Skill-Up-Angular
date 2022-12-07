import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalancesComponent } from './balances-page/balances.component';

const routes: Routes = [{ path: '', component: BalancesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalancesRoutingModule { }
