import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ExchangeService } from 'src/app/core/services/exchange.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'ew-divisas',
  templateUrl: './divisas.component.html',
  styleUrls: ['./divisas.component.scss']

})
export class DivisasComponent implements OnInit {
  exchange: any = [];
  res!: Number;
  form: FormGroup = new FormGroup({});
  importe = new FormControl
  resultado = new FormControl
  Monedas: any = [
    { value: "1", viewValue: 'ARS a USD' },
    { value: "2", viewValue: 'USD a ARS' },
  ];
  seleccionada: string = this.Monedas[0].value;

  constructor(
    private exchangeService: ExchangeService, public fb: FormBuilder,
    public http: HttpService
  ) {
    this.form = fb.group({
      moneda: [''],
      resultado: Number,
      importe: Number
    })
  }

  ngOnInit(): void {
    this.exchangeService.get().subscribe((data) => {
      this.exchange = (data);
    })
  }

  convertir() {
    switch (this.seleccionada) {
      case "2": this.res = this.exchange.blue.value_sell * this.importe.value;
        this.resultado.setValue(this.res)
        break;
      case "1": this.res = this.importe.value / this.exchange.blue.value_buy
        this.resultado.setValue(this.res)
        break;
    }
  }

  onSubmit() {
    this.convertir()
  }

  limpiar() {
    this.importe.reset()
    this.resultado.reset()
  }
}
