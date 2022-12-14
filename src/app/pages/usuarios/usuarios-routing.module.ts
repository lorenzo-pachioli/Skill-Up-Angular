import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios-page/usuarios.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { PerfilDetailComponent } from './perfil-detail/perfil-detail.component';
import { PerfilEditComponent } from './perfil-edit/perfil-edit.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent, pathMatch: 'full' },
  { path: 'reset', component: ResetPassComponent, pathMatch: 'full' },
  { path: 'perfil-edit', component: PerfilEditComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule { }
