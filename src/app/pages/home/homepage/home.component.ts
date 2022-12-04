import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { MatSidenav } from "@angular/material/sidenav";


@Component({
  selector: 'ew-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  events: string[] = [];
  opened!: boolean;

  panelOpenState = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  menuItems = [
    {
      name: 'Dashboard',
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
    private router: Router
  ) {}


  toggle(nav: MatSidenav) {
    const isSmallScreen = this.breakpointObserver.isMatched(
      "(max-width: 599px)"
    );
    if (isSmallScreen) {
      nav.toggle();
    }
  }
  
  item: any;

  onClick(item:any){
    this.item = item;
  }


  ngOnInit(): void {}

  logout() {
    console.log('logout');
  }
}

