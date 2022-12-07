import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilDetailComponent } from './perfil-detail.component';

const routes: Routes = [{ path: '', component: PerfilDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilDetailRoutingModule { }
