import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DivisasComponent } from './divisas-page/divisas.component';
import { ExchangeComponent } from './exchange/exchange.component';

const routes: Routes = [
  { path: '', component: DivisasComponent },
  { path: '', component: ExchangeComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DivisasRoutingModule {}
