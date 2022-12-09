import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginModule } from '../auth-login/auth-login.module';
import { AuthRegistroModule } from '../auth-registro/auth-registro.module';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent,
    pathMatch: 'full'
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
