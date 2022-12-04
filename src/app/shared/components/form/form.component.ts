import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  operationForm: FormGroup | any;

  // chequear si es una nueva operacion o una edicion
  @Input() editDisabled: boolean = false;

  @Output() monto = new EventEmitter<number>();
  @Output() concepto = new EventEmitter<string>();
  @Output() fecha = new EventEmitter<Date>();

  constructor() {
    this.operationForm = new FormGroup({
      monto: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0.01)]),
      concepto: new FormControl('', [Validators.required])
    })
    
   }

  ngOnInit(): void {
    // fecha
    const fecha = new Date();
    this.fecha.emit(fecha);
  }

  // enviar info al componente padre
  agregarNuevoMonto(event: any) {
    this.monto.emit(event.target.value);
  }
  agregarNuevoConcepto(event: any) {
    this.concepto.emit(event.target.value);
  }

}
