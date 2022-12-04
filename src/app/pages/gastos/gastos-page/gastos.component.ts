import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {

  show = 'Cargar';
  constructor() { }

  ngOnInit(): void {
  }

  changeShow(component: string): void {
    this.show = component;
  }

}
