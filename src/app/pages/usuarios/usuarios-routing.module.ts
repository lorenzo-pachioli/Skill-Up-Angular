import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios-page/usuarios.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent },
  { path: 'reset', component: ResetPassComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
