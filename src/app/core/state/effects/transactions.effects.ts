import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'; //TODO <---

import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Transaction } from '../../interfaces/Transaction';
import { DateTimeService } from '../../services/date-time.service';
import { TransactionsService } from '../../services/transactions.service';
import { AppState } from '../app.state';
import { ChartBalancesData, ChartTopPayData, TableData } from '../interfaces/state.interface';
import { chartTopPayData, queryMade, selectAllTransactions, tableData } from 'src/app/core/state/selectors/transactions.selectors';
import { Store } from '@ngrx/store';
import { trTopupPaymentFilter_REQ } from '../actions/transaction.actions';

@Injectable()
export class TransactionsEffects {

    constructor(
        private actions$: Actions,
        private transactionsService: TransactionsService,
        private dateTimeS: DateTimeService,
        private store:Store<AppState>
    ) { }

    loadTransacctions$ = createEffect(() => this.actions$.pipe(
      ofType('[Transaction] Load transactions'),
      mergeMap(() => this.transactionsService.getTransactions()
        .pipe(
          map(({allTransactions}) => {
            return ({ type: '[Transaction] All transactions', allTransactions })
          }),
          catchError(() => EMPTY)
        )
      )
    ));

    setTopPayData$ = createEffect(() => this.actions$.pipe(
      ofType('[Transaction] Request Process Topup Payment Data'),
      withLatestFrom(this.store.select(selectAllTransactions)),
      map((allTransactions)=>{
        return {
          type: '[Transaction] Response Process Topup Payment Data',
          origin: 'ingresosEgresos',
          tableData: this.generateTableData(allTransactions[1]),
          chartTopPayData: this.fillCalendar(this.generateChartData(allTransactions[1]))
        }
      })
    ));

    filterTopPayData$ = createEffect(() => this.actions$.pipe(
      ofType('[Transaction] Request Filter Topup Payment Data'),
      withLatestFrom(this.store.select(tableData),this.store.select(chartTopPayData)),
      map(([filter,tableData,chartTopPayData])=>{
        if(chartTopPayData){
          let copyChartTopPayData: ChartTopPayData = {...chartTopPayData}
          copyChartTopPayData.chart=filter['filter']
          return {
            type: '[Transaction] Response Filter Topup Payment Data',
            tableData: tableData,
            chartTopPayData: copyChartTopPayData
          }
        }else{//TODO: Implementar manejador de error
          return {
            type: '[Transaction] Response Filter Topup Payment Data',
            tableData,
            chartTopPayData
          }
        }
      })
    ));

    setBalanceData$ = createEffect(() => this.actions$.pipe(
      ofType('[Transaction] Request Process Balance Data'),
      withLatestFrom(this.store.select(selectAllTransactions)),
      map((allTransactions)=>{
        return {
          type: '[Transaction] Response Process Balance Data',
          origin: 'balances',
          chartBalancesData: this.generateBalancesData(allTransactions[1])
        }
      })
    ));

    ////////////////////////////////////////////////////////////
    ///////////////////METODOS AUXILIARES///////////////////////
    ////////////////////////////////////////////////////////////

    generateTableData(ingresosEgresos:Transaction[]):TableData{
      let tableData:TableData = {
        title: 'Ingresos y egresos',
        columns: [ "Fecha","Cuenta","Tipo","Concepto","Monto"],
        list: ingresosEgresos.map(data => {
          return{
            fecha: this.dateTimeS.isoToDateTime(data.date),
            cuenta: data.accountId,
            tipo: data.type === 'payment' ? 'Egreso' : 'Ingreso',
            concepto: data.concept,
            monto: data.amount
          }
        })
      }
      return tableData
    }

    generateChartData(ingresosEgresos:Transaction[]):ChartTopPayData{

      //Para generar las etiquetas del eje x
      let dayIterator = new Date()
      let dayForChart = '0'//this.dateTimeS.isoToDate(dayIterator.toISOString())
      let index = -1
      let chartData: ChartTopPayData = {
        chart: 'ingresosEgresos',
        ingresos: [],
        egresos: [],
        fechas: []//fechas: [dayForChart as never] //Agrega de fomra errona una fecha
      } 
  
      ingresosEgresos.forEach(data => {
        if( dayForChart === this.dateTimeS.isoToDate(data.date) ){ //Para un mismo dia se suman las transacciones del mismo tipo
          if(data.type === 'payment'){
            chartData.egresos[index] = ( Number(chartData.egresos[index]) + Number(data.amount) ) as never
          }else{
            chartData.ingresos[index] = ( Number(chartData.ingresos[index]) + Number(data.amount) ) as never
          }
        }else{ //Para un nuevo dia se agrega un elemento
          if(data.type === 'payment'){
            chartData.egresos.push(Number(data.amount) as never)
            chartData.ingresos.push(0 as never)
          }else{
            chartData.ingresos.push(Number(data.amount) as never)
            chartData.egresos.push(0 as never)
          }
          index++
          dayForChart = this.dateTimeS.isoToDate(data.date)
          chartData.fechas.push(dayForChart as never)
        }
      })
      return chartData
    }

    generateBalancesData(ingresosEgresos:Transaction[]):ChartBalancesData{
      //Para generar las etiquetas del eje x
      let dayIterator = new Date()
      let dayForChart = this.dateTimeS.isoToDate(dayIterator.toISOString())
      let index = 0
      let chartData: ChartBalancesData = {
        chart: 'balances',
        balanceARS: [],
        balanceUSD: [],
        fechas: []
      } 
      let twoMonthsData:ChartTopPayData = this.fillCalendar(this.generateChartData(ingresosEgresos))

      let saldo = 10000 //TODO: Definir las cuentas 
      for (let i = twoMonthsData.fechas.length-1; i>=0; i--) {
        chartData.balanceARS.unshift(saldo)
        chartData.fechas.unshift(twoMonthsData.fechas[i])
        saldo += Number(twoMonthsData.egresos[i]) - Number(twoMonthsData.ingresos[i])
      }
      return chartData
    }

    fillCalendar(chartTopPayData:ChartTopPayData){
      let lastDay = new Date()
      lastDay.setMonth(lastDay.getMonth()+1)
      lastDay.setDate(0)
      let firstDay = new Date()
      firstDay.setMonth(firstDay.getMonth()-1)
      firstDay.setDate(1)
      let fechas: string[] = []
      let ingresos: number[] = []
      let egresos: number[] = []
      let totalDays = this.dateTimeS.getDaysInMonth(lastDay.getFullYear(),lastDay.getMonth() + 1) + this.dateTimeS.getDaysInMonth(firstDay.getFullYear(),firstDay.getMonth() + 1)

      for (let i = 0; i < totalDays; i++) {
        fechas.push(this.dateTimeS.isoToDate(firstDay.toISOString()))
        firstDay.setDate(firstDay.getDate()+1)
        let index = chartTopPayData.fechas.indexOf(fechas[i])
        if (index>-1) {
          ingresos.push(chartTopPayData.ingresos[index])
          egresos.push(chartTopPayData.egresos[index])
        }else{
          ingresos.push(0)
          egresos.push(0)
        }
      }
      return{
        chart: chartTopPayData.chart,
        ingresos,
        egresos,
        fechas
      }
    }
    /*setTableData$ = createEffect(() => this.actions$.pipe(
      ofType('[Transaction] Request Process Topup Payment Data'),
      map(() => {
        try {
          return {
              type: '[Transaction] Response Process Topup Payment Data',
              tableData: null,
              GrafIngreEgreData: null
          };
        } catch (error) {
          return {
              type: '[Transaction] Error Process Topup Payment Data',
              error: error.toString()
          }
        }
      })
    ));*/

}