import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/core/interfaces/Investment';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.component.html',
  styleUrls: ['./inversiones.component.scss']
})

export class InversionesComponent implements OnInit {

  detalleInversion: Investment | any;

  constructor( ) { }

  ngOnInit():void{}
  
  receiveDetalle($event: any) {
    this.detalleInversion = $event;
  }


}
  
