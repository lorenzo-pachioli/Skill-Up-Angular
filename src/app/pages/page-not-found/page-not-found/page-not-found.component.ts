import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ew-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  @Input() msg:string = 'Recurso no encontrado'
  constructor() { }

  ngOnInit(): void {
  }

}
