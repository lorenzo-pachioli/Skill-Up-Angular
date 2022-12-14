import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'saldos',
    loadChildren: () =>
      import('../saldos/saldos.module').then((m) => m.SaldosModule),
  },
  {
    path: 'gastos',
    loadChildren: () =>
      import('../gastos/gastos.module').then((m) => m.GastosModule),
  },
  {
    path: 'movimientos',
    loadChildren: () =>
      import('../movimientos/movimientos.module').then(
        (m) => m.MovimientosModule
      ),
  },
  {
    path: 'balances',
    loadChildren: () =>
      import('../balances/balances.module').then((m) => m.BalancesModule),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('../usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },

  {
    path: 'inversiones',
    loadChildren: () =>
      import('../inversiones/inversiones.module').then(
        (m) => m.InversionesModule
      ),
  },
  {
    path: 'transacciones',
    loadChildren: () =>
      import('../transacciones/transacciones.module').then(
        (m) => m.TransaccionesModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'divisas',
    loadChildren: () =>
      import('../divisas/divisas.module').then((m) => m.DivisasModule),
  },
  {
    path: 'perfil-detail',
    loadChildren: () =>
      import('../usuarios/perfil-detail/perfil-detail.module').then(
        (m) => m.PerfilDetailModule
      ),
  },
  {
    path: 'perfil-edit',
    loadChildren: () =>
      import('../usuarios/perfil-edit/perfil-edit.component').then(
        (m) => m.PerfilEditComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
