import { Injectable } from '@angular/core';
import { NewAccount } from '../interfaces/NewAccount';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class DevelopmentOnlyService {

  newAccount:NewAccount | undefined

  constructor(private httpS:HttpService) { }

  generateAccountAndTransanctions(){
    this.httpS.post('/accounts',{}).subscribe(resp=>{
      this.newAccount = resp as NewAccount

      let days=45 //Dias con transacciones
      let date = new Date()
      let typeStr = ['topup','payment']

      for (let i = 0; i < days; i++) { 

        date.setDate(date.getDate()-1)

        let numTr = this.random(0,3) //Entre 0 y 3 transacciones por dia
        for (let j = 0; j < numTr; j++) {
          let amount = this.random(500,10000) //Monto entre 500 y 10000
          date.setHours(this.random(6,23)) //Hora entre 6 y 23hs
          let tr={
            "amount": amount,
            "concept": "Pago de honorarios",
            "date": date.toISOString(),
            "type": typeStr[this.random(0,1)],
            "accountId": this.newAccount?.id,
            "userId": this.newAccount?.userId,
            "to_account_id": 1850
          }      
          this.httpS.post('/transactions',tr).subscribe(res=>console.log(res))
          console.log(tr)
        }
      }
    })
      
  }

  random(min:number, max:number) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor( rand * (difference+1));
    rand = rand + min;
    return rand;
  }

}
