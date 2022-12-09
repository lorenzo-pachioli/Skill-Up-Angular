import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginModule } from '../auth-login/auth-login.module';
import { AuthRegistroModule } from '../auth-registro/auth-registro.module';
import { ResetPassComponent } from '../usuarios/reset-pass/reset-pass.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('../auth-landing/landing.module').then(
        (m) => m.LandingModule
      ),
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () =>
      import('../auth-login/auth-login.module').then(
        (m) => m.AuthLoginModule
      ),
  },
  {
    path: 'register',
    pathMatch: 'full',
    loadChildren: () =>
      import('../auth-registro/auth-registro.module').then(
        (m) => m.AuthRegistroModule
      ),
  },
  {
    path: 'reset',
    pathMatch: 'full',
    component: ResetPassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
