import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'; //TODO <---

import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Transaction } from '../../interfaces/Transaction';
import { DateTimeService } from '../../services/date-time.service';
import { TransactionsService } from '../../services/transactions.service';
import { AppState } from '../app.state';
import { AccountsStates, ChartBalancesData, ChartTopPayData, TableData } from '../interfaces/state.interface';
import { chartTopPayData, trQueryMade, selectAllTransactions, tableData } from 'src/app/core/state/selectors/transactions.selectors';
import { Store } from '@ngrx/store';
import { trTopupPaymentFilterChart_REQ } from '../actions/transaction.actions';
import { accountsQueryMade, ARSAccount, selectAccounts } from '../selectors/accounts.selectors';

@Injectable()
export class TransactionsEffects {

  accountFilter:'USDAccount'|'ARSAccount'='ARSAccount'

  constructor(
      private actions$: Actions,
      private transactionsService: TransactionsService,
      private dateTimeS: DateTimeService,
      private store:Store<AppState>
  ) { }

    //Trae de la API y almacena las transacciones
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

    //Procesa la informacion de las transacciones para mostrar en la tabla y el grafico
    setTopPayData$ = createEffect(() => this.actions$.pipe(
      ofType('[Transaction] Request Process Topup Payment Data'),
      withLatestFrom(this.store.select(selectAllTransactions),this.store.select(selectAccounts)),
      map((props)=>{

        //Obtengo el ID de la cuenta seleccionada
        let accID = props[2].selectedAccount == "ARSAccount" ? props[2].ARSAccount?.id : props[2].USDAccount?.id
        //Filtro la cuenta por moneda
        let someTransactions = props[1].filter(tr=>tr.accountId == accID)

        return {
          type: '[Transaction] Response Process Topup Payment Data',
          origin: 'ingresosEgresos',
          tableData: this.generateTableData(someTransactions),
          chartTopPayData: this.fillCalendar(this.generateChartData(someTransactions))
        }
      })
    ));

    //Escucha el action para conmutar el grafico entre ingreso, egreso, ambas
    filterTopPayData$ = createEffect(() => this.actions$.pipe(
      ofType('[Transaction] Request Filter Chart Topup Payment Data'),
      withLatestFrom(this.store.select(chartTopPayData)),
      map(([filter,chartTopPayData])=>{
        if(chartTopPayData){
          let copyChartTopPayData: ChartTopPayData = {...chartTopPayData}
          copyChartTopPayData.chart=filter['filter']
          return {
            type: '[Transaction] Response Filter Chart Topup Payment Data',
            chartTopPayData: copyChartTopPayData
          }
        }else{//TODO: Implementar manejador de error
          return {
            type: '[Transaction] Response Filter Chart Topup Payment Data',
            chartTopPayData
          }
        }
      })
    ));

    //Procesa la informacion de los balances para mostrar en el grafico
    setBalanceData$ = createEffect(() => this.actions$.pipe(
      ofType('[Transaction] Request Process Balance Data'),
      withLatestFrom(this.store.select(selectAllTransactions),this.store.select(selectAccounts)),
      map((props)=>{
        return {
          type: '[Transaction] Response Process Balance Data',
          origin: 'balances',
          chartBalancesData: this.generateBalancesData(props[1],props[2])
        }
      })
    ));

    ////////////////////////////////////////////////////////////
    ///////////////////METODOS AUXILIARES///////////////////////
    ////////////////////////////////////////////////////////////

    //Mapea los datos para mostrar en la tabla
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

    //Combina todos los ingresos del mismo dia, lo mismo para los egresos
    //Devuelve ingresos, egresos y fechas en vectores distintos
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

    //Calcula el balance partiendo del saldo actual
    generateBalancesData(ingresosEgresos:Transaction[], accounts: AccountsStates):ChartBalancesData{

      let chartData: ChartBalancesData = {
        chart: 'balances',
        balanceARS: [],
        balanceUSD: [],
        fechas: []
      } 

      let trARS = ingresosEgresos.filter(tr=>tr.accountId == accounts.ARSAccount?.id)
      let trUSD = ingresosEgresos.filter(tr=>tr.accountId == accounts.USDAccount?.id)


      let twoMonthsDataARS:ChartTopPayData = this.fillCalendar(this.generateChartData(trARS))
      let twoMonthsDataUSD:ChartTopPayData = this.fillCalendar(this.generateChartData(trUSD))

      //Saldo actual
      let moneyARS = accounts.ARSAccount?.money ? Number(accounts.ARSAccount?.money) : 0
      let moneyUSD = accounts.USDAccount?.money ? Number(accounts.USDAccount?.money) : 0

      for (let i = twoMonthsDataARS.fechas.length-1; i>=0; i--) {
        chartData.balanceARS.unshift(moneyARS)
        chartData.balanceUSD.unshift(moneyUSD)
        chartData.fechas.unshift(twoMonthsDataUSD.fechas[i])
        moneyARS += Number(twoMonthsDataARS.egresos[i]) - Number(twoMonthsDataARS.ingresos[i])
        moneyUSD += Number(twoMonthsDataUSD.egresos[i]) - Number(twoMonthsDataUSD.ingresos[i])
      }

      //Elimina los puntos para dias posteriores al actual
      let dayIterator = new Date()
      dayIterator.setDate(dayIterator.getDate()+1)
      let tomorrow = this.dateTimeS.isoToDate(dayIterator.toISOString())
      let index = chartData.fechas.indexOf(tomorrow)
      for (let i = index; i<chartData.fechas.length; i++) {
        chartData.balanceARS[i]=NaN
        chartData.balanceUSD[i]=NaN
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