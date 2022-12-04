import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
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


  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    console.log('logout');
  }

}

