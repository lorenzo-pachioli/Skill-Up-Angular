import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DivisasComponent } from './divisas-page/divisas.component';

<<<<<<< HEAD
const routes: Routes = [
  { path: '', component: DivisasComponent },
  { path: 'exchange', component: ExchangeComponent }



];
=======
const routes: Routes = [{ path: '', component: DivisasComponent}]
>>>>>>> d9c2f4c56d5d18ecb3f577f08a88d39a90956d69

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DivisasRoutingModule {}
