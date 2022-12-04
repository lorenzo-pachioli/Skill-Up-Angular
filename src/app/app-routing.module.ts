import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/homepage/home.component';

const routes: Routes = [
  {
    path: 'auth/login',
    loadChildren: () =>
      import('./pages/auth-login/auth-login.module').then(
        (m) => m.AuthLoginModule
      ),
  },
  {
    path: 'auth/register',
    loadChildren: () =>
      import('./pages/auth-registro/auth-registro.module').then(
        (m) => m.AuthRegistroModule
      ),
  },
  {
    path: '',
    component: HomeComponent,
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'perfil-detail',
    loadChildren: () =>
      import('./pages/usuarios/perfil-detail/perfil-detail.module').then(
        (m) => m.PerfilDetailModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
