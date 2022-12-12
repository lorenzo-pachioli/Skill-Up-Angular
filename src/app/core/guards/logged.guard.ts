import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { HttpService } from '../services/http.service';
import { login } from '../state/actions/user.actions';
@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {

  token = localStorage.getItem('token');

  constructor(
    private _router: Router,
    private http: HttpService,
    private store: Store,
    private dialog: MatDialog
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (!this.token) {
      this._router.navigateByUrl('/auth');
      return false;
    }

    this.http.get('/auth/me').subscribe({
      next: (res: any) => this.store.dispatch(login({ user: { ...res, token: this.token ? this.token : '' } })),
      error: () => this.openDialog('Sesión expirada', 'Debe volver a iniciar sisión'),
      complete: () => true
    })
    return true;
  }

  private openDialog(title: string, content: string): void {
    this.dialog.open(AlertComponent, {
      width: '400px',
      disableClose: true,
      data: {
        title,
        content
      }
    }).afterClosed().subscribe(() => {
      this._router.navigate(['/auth']);
      return false;
    })
  }
}
