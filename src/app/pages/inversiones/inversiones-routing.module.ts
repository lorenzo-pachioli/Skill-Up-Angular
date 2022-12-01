import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InversionesComponent } from './inversiones-page/inversiones.component';

const routes: Routes = [{ path: '', component: InversionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InversionesRoutingModule {}
