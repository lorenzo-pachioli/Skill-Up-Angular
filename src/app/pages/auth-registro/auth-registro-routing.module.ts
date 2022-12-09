import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPassComponent } from '../usuarios/reset-pass/reset-pass.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroComponent,
  },
  {
    path: 'reset-password',
    component: ResetPassComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRegistroRoutingModule { }
