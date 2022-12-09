import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";
import { Router } from '@angular/router';
import { BreakpointObserver } from "@angular/cdk/layout";
import { HttpService } from 'src/app/core/services/http.service';
import { IBalance } from 'src/app/core/interfaces/Balance';

@Component({
  selector: 'ew-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  events: string[] = [];
  opened!: boolean;
  isMenuOpen = false;

  @Output() snavChange: EventEmitter<any> = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  toggle(nav: MatSidenav) {
    const isSmallScreen = this.breakpointObserver.isMatched(
      "(max-width: 599px)"
    );
    if (isSmallScreen) {
      nav.toggle();
    }
  }

  menuState(newState: boolean): void {
    this.isMenuOpen = newState
  }

  item: any;

  onClick(item: any) {
    this.item = item;
  }

  ngOnInit(): void { }

  logout() {
    console.log('logout');
    localStorage.getItem('token');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }


}
