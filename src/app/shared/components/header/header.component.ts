import { Component, OnInit } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";
import { Router } from '@angular/router';
import { BreakpointObserver } from "@angular/cdk/layout";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  events: string[] = [];
  opened!: boolean;


  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

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

}
