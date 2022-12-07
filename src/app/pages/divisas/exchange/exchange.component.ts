import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,  FormBuilder } from '@angular/forms';
import { ExchangeService } from 'src/app/core/services/exchange.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'ew-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

form: FormGroup = new FormGroup({});
importe = new FormControl
resultado = new FormControl



Monedas:any = [
 {value: "1", viewValue: 'ARS a USD'},
  {value: "2", viewValue: 'USD a ARS'},
];
  exchange!: any[];

  constructor(
    private http: HttpService,
    public fb:FormBuilder,
    public exchangeService:ExchangeService

  ) { this.form = fb.group({
    moneda: [''], 
  })
}
   
  ngOnInit(): void {
  }

getf(){
  

  return this.form.controls;
}

submit(){
  
}
convertir(){
    //this.form.patchValue({
      //resultado: this.exchangeService.convert(Number(this.form.get(this.Monedas)?.value), true).toFixed(2)
   // });
  

  
    const valueSell=this.exchange.flatMap(data =>this.exchange);
    console.log(this.exchange)

   

    
  }
  private mappingResponse(res: any): void {
    this.exchange.map(account => {
      let added = 0;
      let payments = 0;
      res.data.map((transaction: any) => {
        if (account.id === transaction.accountId) {
          if (transaction.type === 'payment') {
            payments = payments + Number(transaction.amount)
          } else {
            added = added + Number(transaction.amount)
          }
        }
      })
      account.money = added - payments;
    })
  }
}

