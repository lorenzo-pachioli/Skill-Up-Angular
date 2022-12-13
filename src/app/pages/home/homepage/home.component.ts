import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { MatSidenav } from "@angular/material/sidenav";
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
  selector: 'ew-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 0 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    { length: 0 },
    () =>
      `Alkemy`
  );

  private _mobileQueryListener: () => void;

  panelOpenState = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  events: string[] = [];
  opened!: boolean;

  menuItems = [
    {
      name: 'General',
      icon: 'dashboard',
      link: 'home',
    },
    {
      name: 'Saldos',
      icon: 'savings',
      link: 'saldos',
    },
    {
      name: 'Gastos',
      icon: 'receipt_long',
      link: 'gastos',
    },
    {
      name: 'Balances',
      icon: 'balance',
      link: 'balances',
    },
    {
      name: 'Movimientos',
      icon: 'swap_horiz',
      link: 'movimientos',
    },
    {
      name: 'Divisas',
      icon: 'currency_exchange',
      link: 'divisas',
    },
    {
      name: 'Inversiones',
      icon: 'trending_up',
      link: 'inversiones',
    },
    {
      name: 'Usuarios',
      icon: 'account_circle',
      link: 'usuarios',
    },
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  /*  toggle(nav: MatSidenav) {
     const isSmallScreen = this.breakpointObserver.isMatched(
       "(max-width: 599px)"
     );
     if (isSmallScreen) {
       nav.toggle();
     }
   } */

  item: any;

  onClick(item: any) {
    this.item = item;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void { }

  logout() {
    console.log('logout');
  }
}



