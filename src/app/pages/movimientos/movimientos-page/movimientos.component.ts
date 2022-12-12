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
import { ChartTopPayData, TableData, TableRow } from 'src/app/core/state/interfaces/state.interface';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {

  trQueryMade$: Observable<any> = new Observable()
  tableData$: Observable<any> = new Observable()
  tableDataFilter$: Observable<any> = new Observable()

  loading:boolean=true
  list=[]
  listFiltered=[]
  title=''
  columns=[]

  constructor( 
    private dev:DevelopmentOnlyService,
    private store:Store<AppState>
  ) { 
    this.trQueryMade$ = this.store.select(trQueryMade)
    this.tableData$ = this.store.select(tableData)
    this.tableDataFilter$ = this.store.select(tableDataFilter)
  }

  ngOnInit(): void {
    /////////////////////////////////////////////
    ////Develoment only, iniciar una sola vez////
    //this.dev.generateAccountAndTransanctions()
    /////////////////////////////////////////////
    //this.httpS.get('/accounts/me').subscribe(resp=>console.log('accounts',resp))

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
        this.filterList('')     
      }
    })

    this.tableDataFilter$.subscribe((resp:string)=>{
      this.filterList(resp)
    })
  }

  filterList(condition:string){
    if (condition==='') {
      this.listFiltered=this.list
    }else{
      this.listFiltered=this.list.filter((fila:TableRow)=>{
        let bool: boolean = false
        for (const elem in fila) {
          bool ||= (String(fila[elem as keyof TableRow]).includes(condition))
        }
        return bool
        //return fila.concepto.includes(condition) || String(fila.cuenta).includes(condition) || fila.fecha.includes(condition) || String(fila.monto).includes(condition) || String(fila.tipo).includes(condition)
      })
    }
  }

  todo(){
    this.store.dispatch(trTopupPaymentFilterChart_REQ({filter:'ingresosEgresos'}))
  }

  ingresos(){
    this.store.dispatch(trTopupPaymentFilterChart_REQ({filter:'ingresos'}))
  }

  egresos(){
    this.store.dispatch(trTopupPaymentFilterChart_REQ({filter:'egresos'}))
  }

}
