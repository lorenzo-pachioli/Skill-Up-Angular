import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { ExchangeService } from 'src/app/core/services/exchange.service';


@Component({
  selector: 'ew-divisas',
  templateUrl: './divisas.component.html',
  styleUrls: ['./divisas.component.scss']

})
export class DivisasComponent implements OnInit {
exchange:any=[];

form: FormGroup = new FormGroup({});
importe = new FormControl
resultado = new FormControl
Monedas:any = [
 {value: "1", viewValue: 'ARS a USD'},
  {value: "2", viewValue: 'USD a ARS'},
];
constructor(
    private exchangeService: ExchangeService,    public fb:FormBuilder

  ) { 
    this.form = fb.group({
      moneda: [''], 
    })
  }

  ngOnInit(): void {
    this.exchangeService.get().subscribe(( data) => {
      console.log(data)
      this.exchange= (data);
      })
  }
  convertir(){
    //this.form.patchValue({
      //resultado: this.exchangeService.convert(Number(this.form.get(this.Monedas)?.value), true).toFixed(2)
   // });
  const valueSell=this.exchange.flatMap((data: any) =>this.exchange);
    console.log(this.exchange)
    }

    submit(){}
}
