import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ew-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {

  @Input() titulo:string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
