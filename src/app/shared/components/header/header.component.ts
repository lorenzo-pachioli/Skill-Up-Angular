
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from "@angular/cdk/layout";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { User } from 'src/app/core/state/interfaces/state.interface';
import { Observable } from 'rxjs';
import { selectedUser } from 'src/app/core/state/auth/auth.reducer';


@Component({
  selector: 'ew-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  events: string[] = [];
  opened!: boolean;
  isMenuOpen = false;
  item: any;
  user!: User;

  currentUser$: Observable<any> = new Observable();
  @Output() snavChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.currentUser$ = this.store.select(selectedUser);
    this.currentUser$.subscribe(value => {
      this.user = value.autenticated && value.user
    });
  }

  toggle(nav: MatSidenav) {
    const isSmallScreen =
      this.breakpointObserver.isMatched('(max-width: 599px)');
    if (isSmallScreen) {
      nav.toggle();
    }
  }

  menuState(newState: boolean): void {
    this.isMenuOpen = newState;
  }

  onClick(item: any) {
    this.item = item;
  }


  ngOnInit(): void { }

  logout() {
    this.store.dispatch({ type: '[User] Logout' });
    localStorage.getItem('token');
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }
}
