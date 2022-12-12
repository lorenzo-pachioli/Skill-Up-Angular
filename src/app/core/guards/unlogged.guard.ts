import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
} from '@angular/router';
import { Store } from '@ngrx/store';
@Injectable({
  providedIn: 'root',
})
export class UnloggedGuard implements CanActivate {
  constructor(private _router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return true;
    }

    this._router.navigateByUrl('/');
    return false;
  }
}
