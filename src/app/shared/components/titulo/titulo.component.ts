import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'ew-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {
  @Input() titulo: string ='Ingrese título';

  constructor() { }

  ngOnInit(): void {
  }

}
