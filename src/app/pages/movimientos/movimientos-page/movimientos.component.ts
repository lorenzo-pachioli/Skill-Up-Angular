import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DevelopmentOnlyService } from 'src/app/core/development-only/development-only.service';
import { Transaction } from 'src/app/core/interfaces/Transaction';
import { APITransactions } from 'src/app/core/interfaces/APITransactions';
import { DateTimeService } from 'src/app/core/services/date-time.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Store } from '@ngrx/store';
import { transactions_REQ, trTopupPaymentData_REQ, trTopupPaymentFilter_REQ } from 'src/app/core/state/actions/transaction.actions';
import { chartTopPayData, queryMade, selectAllTransactions, tableData } from 'src/app/core/state/selectors/transactions.selectors';
import { AppState } from 'src/app/core/state/app.state';
import { ChartTopPayData, TableData } from 'src/app/core/state/interfaces/state.interface';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {

  queryMade$: Observable<any> = new Observable()
  tableData$: Observable<any> = new Observable()
  charData$: Observable<any> = new Observable()

  loading:boolean=true
  list=[]
  title=''
  columns=[]

  constructor( 
    private dev:DevelopmentOnlyService,
    private store:Store<AppState>
  ) { 
    this.queryMade$ = this.store.select(queryMade)
    this.tableData$ = this.store.select(tableData)
    this.charData$ = this.store.select(chartTopPayData)
  }

  ngOnInit(): void {
    /////////////////////////////////////////////
    ////Develoment only, iniciar una sola vez////
    //this.dev.generateAccountAndTransanctions()
    /////////////////////////////////////////////
    //this.httpS.get('/accounts/me').subscribe(resp=>console.log('accounts',resp))

    this.queryMade$.subscribe(made=>{
      if(made){ //Si los datos ya estan cargados
        this.store.dispatch(trTopupPaymentData_REQ())//Procesa la tabla y el grafico
      }else{ //Si no estan cargados se los pide a la API
        this.store.dispatch(transactions_REQ())
      }
    })

    this.tableData$.subscribe((resp:TableData|null)=>{
      if(resp!==null){
        this.list = resp.list as never
        this.title = resp.title
        this.columns = resp.columns as never
        this.loading = false        
      }
    })
  }

  todo(){
    this.store.dispatch(trTopupPaymentFilter_REQ({filter:'ingresosEgresos'}))
  }

  ingresos(){
    this.store.dispatch(trTopupPaymentFilter_REQ({filter:'ingresos'}))
  }

  egresos(){
    this.store.dispatch(trTopupPaymentFilter_REQ({filter:'egresos'}))
  }

}
