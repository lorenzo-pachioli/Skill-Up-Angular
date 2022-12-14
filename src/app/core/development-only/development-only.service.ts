import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from '../interfaces/Account';
import { NewAccount } from '../interfaces/NewAccount';
import { HttpService } from '../services/http.service';
import { AppState } from '../state/app.state';
import { AccountsStates } from '../state/interfaces/state.interface';
import { selectAccounts } from '../state/selectors/accounts.selectors';

@Injectable({
  providedIn: 'root'
})
export class DevelopmentOnlyService {

  selectAccounts$: Observable<any> = new Observable()

  constructor(private httpS:HttpService, private store:Store<AppState>) { 
    this.selectAccounts$ = this.store.select(selectAccounts)
  }

  generateTransanctions(){
    this.selectAccounts$.subscribe((acc:AccountsStates)=>{
      if(acc.ARSAccount && acc.USDAccount){
        console.log('selectAccounts$ es no null')
        this.generateARSTransanctions(acc.ARSAccount)
        this.generateUSDTransanctions(acc.USDAccount)
      }else{
        console.log('selectAccounts$ es null')
      }
    })
  }

  generateARSTransanctions(ARSAccount:Account){

    let days=45 //Dias con transacciones
    let date = new Date()
    let typeStr = ['topup','payment']

    for (let i = 0; i < days; i++) { 

      date.setDate(date.getDate()-1)

      let numTr = this.random(0,3) //Entre 0 y 3 transacciones por dia
      numTr = numTr>0 ? numTr-1 : numTr
      for (let j = 0; j < numTr; j++) {
        let amount = this.random(500,10000) //Monto entre 500 y 10000
        date.setHours(this.random(6,23)) //Hora entre 6 y 23hs
        let tr={
          "amount": amount,
          "concept": "Pago de honorarios",
          "date": date.toISOString(),
          "type": typeStr[this.random(0,1)],
          "accountId": ARSAccount.id,
          "userId": ARSAccount.userId,
          "to_account_id": 1850
        }      
        this.httpS.post('/transactions',tr).subscribe(res=>console.log(res))
        console.log(tr)
      }
    }
  }

  generateUSDTransanctions(USDAccount:Account){
    let days=45 //Dias con transacciones
    let date = new Date()
    let typeStr = ['topup','payment']

    for (let i = 0; i < days; i++) { 

      date.setDate(date.getDate()-1)

      let numTr = this.random(0,1) //Entre 0 y 3 transacciones por dia
      for (let j = 0; j < numTr; j++) {
        let amount = this.random(50,1000) //Monto entre 500 y 10000
        date.setHours(this.random(6,23)) //Hora entre 6 y 23hs
        let tr={
          "amount": amount,
          "concept": "Pago de honorarios",
          "date": date.toISOString(),
          "type": typeStr[this.random(0,1)],
          "accountId": USDAccount.id,
          "userId": USDAccount.userId,
          "to_account_id": 1850
        }      
        this.httpS.post('/transactions',tr).subscribe(res=>console.log(res))
        console.log(tr)
      }
    }

  }

  random(min:number, max:number) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor( rand * (difference+1));
    rand = rand + min;
    return rand;
  }

}
