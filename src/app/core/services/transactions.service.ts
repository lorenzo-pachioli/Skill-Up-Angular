import { Injectable, Type } from '@angular/core';
import { from, Observable, of, switchMap } from 'rxjs';
import { APITransactions } from '../interfaces/APITransactions';
import { Transaction } from '../interfaces/Transaction';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TransactionsState } from '../state/interfaces/state.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  ingresosEgresos: Transaction[] = []

  constructor(private http: HttpClient, private httpS:HttpService) { }

  getTransactions(): Observable<TransactionsState>{
    return this.getMultipleTransactions('/transactions')
  }

  getMultipleTransactions(route:string):Observable<any>{
    return this.http.get<APITransactions>(environment.api_url + route).pipe( // fetch the page
      switchMap( (res:APITransactions) => {
        res.data.forEach((dat:Transaction) => {this.ingresosEgresos.push(dat)}) //Array con todas las transacciones
        if(res.nextPage && this.ingresosEgresos.length <20){//Recursividad hasta cumplir la condicion
          return this.getMultipleTransactions(res.nextPage)
        }else{//Muestra los datos
          //this.store.dispatch(transactions_RES({allTransactions:ingresosEgresos}))
          //this.generateChartData()
          //this.generateTableData()
          //console.log('ingresosEgresos',this.ingresosEgresos)
          return of({allTransactions:this.ingresosEgresos})
        }
      }
      )
    );
  }

}

