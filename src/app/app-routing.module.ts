import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/homepage/home.component';
import { LoggedGuard } from './core/guards/logged.guard';
import { UnloggedGuard } from './core/guards/unlogged.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages//auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },
  {
    path: '',
    canActivate: [LoggedGuard],
    component: HomeComponent,
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'perfil-detail',
    canActivate: [LoggedGuard],
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
export class AppRoutingModule { }
