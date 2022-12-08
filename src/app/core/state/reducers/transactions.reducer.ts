import { createReducer, on } from '@ngrx/store';
import { Transaction } from '../../interfaces/Transaction';
import { transactions_RES, transactions_REQ, trTopupPaymentData_REQ, trTopupPaymentData_RES, trTopupPaymentFilter_REQ, trTopupPaymentFilter_RES, trBalanceData_RES, trBalanceData_REQ } from '../actions/transaction.actions';
import { TableData, TableRow, TransactionsState } from '../interfaces/state.interface';
import { DateTimeService } from 'src/app/core/services/date-time.service';

export const initialState:TransactionsState = {
  queryMade: false,
  allTransactions: [],
  timeSpan: 'Last30Days',
  tableData: null,
  chartTopPayData: null,
  chartBalancesData: null
};

export const transactionsReducer = createReducer(
  initialState,
  on(transactions_REQ, (state) => 
    (state)
  ),
  on(transactions_RES, (state, { allTransactions }) => 
    ({...state, queryMade:true, allTransactions })
  ),

  on(trTopupPaymentData_REQ, (state) => (state)),
  on(trTopupPaymentData_RES, (state, {tableData, chartTopPayData}) => ({...state, tableData, chartTopPayData })),

  on(trTopupPaymentFilter_REQ, (state) => (state)),
  on(trTopupPaymentFilter_RES, (state, {tableData, chartTopPayData}) => ({...state, tableData, chartTopPayData })),

  on(trBalanceData_REQ, (state) => (state)),
  on(trBalanceData_RES, (state, {chartBalancesData}) => ({...state, chartBalancesData })),

);




/*function todo(){
  //chart
  this.grafData.egresos.forEach((data,index) => { this.grafData.egresos[index] = data>0 ? -data : data }) //Cambia el signo
  this.chart='ingresosEgresos'
  //table
  this.displayedItems = this.table
  this.titulo="Ingresos y egresos" 
  this.displayedColumns=[ "date","type","concept","amount"]
  this.columnsHeader=[ "Fecha","Cuenta","Tipo","Concepto","Monto"]
}

function ingresos(){
  //chart
  this.chart='ingresos'
  //table
  let filter = this.table.filter((ie:Transaction)=>ie.type=='Ingreso')
  this.displayedItems = filter as any
  this.titulo="Ingresos" 
  this.displayedColumns=[ "date","concept","amount"]
  this.columnsHeader=[ "Fecha","Cuenta","Concepto","Monto"]
}

function egresos(){
  //chart
  this.grafData.egresos.forEach((data,index) => { this.grafData.egresos[index] = data<0 ? -data : data }) //Cambia el signo
  this.chart='egresos'
  //table
  let filter = this.table.filter((ie:Transaction)=>ie.type=='Egreso')
  this.displayedItems = filter as any
  this.titulo="Egresos" 
  this.displayedColumns=[ "date","concept","amount"]
  this.columnsHeader=[ "Fecha","Cuenta","Concepto","Monto"]
}*/