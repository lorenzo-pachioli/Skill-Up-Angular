import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DevelopmentOnlyService } from 'src/app/core/development-only/development-only.service';
import { Transaction } from 'src/app/core/interfaces/Transaction';
import { APITransactions } from 'src/app/core/interfaces/APITransactions';
import { DateTimeService } from 'src/app/core/services/date-time.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Store } from '@ngrx/store';
import { transactions_REQ, trTopupPaymentData_REQ, trTopupPaymentFilterChart_REQ } from 'src/app/core/state/actions/transaction.actions';
import { chartTopPayData, trQueryMade, selectAllTransactions, tableData, tableDataFilter } from 'src/app/core/state/selectors/transactions.selectors';
import { AppState } from 'src/app/core/state/app.state';
import { AccountsStates, ChartTopPayData, TableData, TableRow } from 'src/app/core/state/interfaces/state.interface';
import { accounts_REQ, accountToggle } from 'src/app/core/state/actions/account.actions';
import { selectAccounts } from 'src/app/core/state/selectors/accounts.selectors';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {

  trQueryMade$: Observable<any> = new Observable()
  tableData$: Observable<any> = new Observable()
  tableDataFilter$: Observable<any> = new Observable()
  selectAccounts$: Observable<any> = new Observable()

  loading:boolean=true
  list=[]
  listFiltered=[]
  title=''
  columns=[]

  filter=''
  localFilter=''

  constructor( 
    private dev:DevelopmentOnlyService,
    private store:Store<AppState>
  ) { 
    this.trQueryMade$ = this.store.select(trQueryMade)
    this.tableData$ = this.store.select(tableData)
    this.tableDataFilter$ = this.store.select(tableDataFilter)
    this.selectAccounts$ = this.store.select(selectAccounts)
  }

  ngOnInit(): void {
    /////////////////////////////////////////////
    ////Develoment only, iniciar una sola vez////
    //this.dev.generateTransanctions()
    /////////////////////////////////////////////
    //this.httpS.get('/accounts/me').subscribe(resp=>console.log('accounts',resp))

    //Iniciador del estado para las cuentas
    /*this.selectAccounts$.subscribe((accountsStates:AccountsStates)=>{
      console.log(accountsStates)
      if(accountsStates.AccountsQueryMade){ //Si los datos ya estan cargados
        //TODO: revisar si hay conflicto si las transacciones responden primero
      }else{ //Si no estan cargados se los pide a la API
        this.store.dispatch(accounts_REQ())
      }
    })*/

    this.trQueryMade$.subscribe(made=>{
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
        this.filterList()     
      }
    })

    this.tableDataFilter$.subscribe((resp:string)=>{
      this.filter=resp
      this.filterList()
    })
  }

  filterList(){
    let firstList
    if(this.localFilter===''){
      firstList=this.list
    }else{
      firstList=this.list.filter((fila:TableRow)=>fila.tipo===this.localFilter)
    }
    if (this.filter==='') {
      this.listFiltered=firstList
    }else{
      this.listFiltered=firstList.filter((fila:TableRow)=>{
        let bool: boolean = false
        for (const elem in fila) {
          bool ||= (String(fila[elem as keyof TableRow]).includes(this.filter))
        }
        return bool
        //return fila.concepto.includes(condition) || String(fila.cuenta).includes(condition) || fila.fecha.includes(condition) || String(fila.monto).includes(condition) || String(fila.tipo).includes(condition)
      })
    }
  }

  usd(){
    this.store.dispatch(accountToggle({selectedAccount:'USDAccount'}))
  }

  ars(){
    this.store.dispatch(accountToggle({selectedAccount:'ARSAccount'}))
  }

  todo(){
    this.store.dispatch(trTopupPaymentFilterChart_REQ({filter:'ingresosEgresos'}))
    this.localFilter=''
    this.filterList()
  }

  ingresos(){
    this.store.dispatch(trTopupPaymentFilterChart_REQ({filter:'ingresos'}))
    this.localFilter='Ingreso'
    this.filterList()
  }

  egresos(){
    this.store.dispatch(trTopupPaymentFilterChart_REQ({filter:'egresos'}))
    this.localFilter='Egreso'
    this.filterList()
  }

}
