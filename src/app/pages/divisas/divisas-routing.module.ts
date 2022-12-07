import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DivisasComponent } from './divisas-page/divisas.component';

const routes: Routes = [
  { path: '', component: DivisasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DivisasRoutingModule {}
