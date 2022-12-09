import { Component, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";
import { Router } from '@angular/router';
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: 'ew-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  events: string[] = [];
  opened!: boolean;
  isMenuOpen = false;
  item: any;

  @Output() snavChange: EventEmitter<any> = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  ngOnInit(): void { }

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

  onClick(item: any) {
    this.item = item;
  }

  logout() {
    localStorage.getItem('token');
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }
}
