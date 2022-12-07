import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { DevelopmentOnlyService } from 'src/app/core/development-only/development-only.service';
import { Transaction } from 'src/app/core/interfaces/Transaction';
import { Transactions } from 'src/app/core/interfaces/Transactions';
import { DateTimeService } from 'src/app/core/services/date-time.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {

  transactions!: Transactions
  ingresosEgresos: Transaction[] = []
  chart:string = ''
  table: any
  grafData = {
    ingresos:[0],
    egresos:[0],
    fechas:[]
  }

  loading:boolean=true
  displayedItems=[]
  displayedColumns=['']
  columnsHeader=['']
  titulo=''

  constructor( private httpS:HttpService, private dateTimeS: DateTimeService, private dev:DevelopmentOnlyService ) { }

  ngOnInit(): void {
    /////////////////////////////////////////////
    ////Develoment only, iniciar una sola vez////
    //this.dev.generateAccountAndTransanctions()
    /////////////////////////////////////////////
    this.httpS.get('/accounts/me').subscribe(resp=>console.log(resp))

    this.getTransactions('/transactions').subscribe(resp=>
      console.log(resp)
    )
  }

  getTransactions(route:string):Observable<any>{

    return this.httpS.get(route).pipe( // fetch the page
      switchMap( (res:any) => {
        res.data.forEach((dat:Transaction) => this.ingresosEgresos.push(dat)) //Array con todas las transacciones
        if(res.nextPage && this.ingresosEgresos.length <100){//Recursividad hasta cumplir la condicion
          return this.getTransactions(res.nextPage)
        }else{//Muestra los datos
          this.generateChartData()
          this.generateTableData()
          return this.ingresosEgresos
        }
      }
      )
    );
  }

  generateTableData(){
    /*this.ingresosEgresos.forEach(data => {
      //table
      data.date = this.dateTimeS.isoToDateTime(data.date) 
      data.type = data.type === 'payment' ? 'Egreso' : 'Ingreso'
    })*/
    this.table = this.ingresosEgresos.map(data => {
      return{
        date: this.dateTimeS.isoToDateTime(data.date),
        type: data.type === 'payment' ? 'Egreso' : 'Ingreso',
        concept: data.concept,
        amount: data.amount
      }
    })
    this.loading=false
    this.todo()
  }

  generateChartData(){

    //Para generar las etiquetas del eje x
    let dayIterator = new Date()
    let dayForChart = this.dateTimeS.isoToDate(dayIterator.toISOString())
    let index = 0
    this.grafData.fechas = [dayForChart as never]

    this.ingresosEgresos.forEach(data => {
      if( dayForChart === this.dateTimeS.isoToDate(data.date) ){ //Para un mismo dia se suman las transacciones del mismo tipo
        if(data.type === 'payment'){
          this.grafData.egresos[index] = ( Number(this.grafData.egresos[index]) - Number(data.amount) ) as never
        }else{
          this.grafData.ingresos[index] = ( Number(this.grafData.ingresos[index]) + Number(data.amount) ) as never
        }
      }else{ //Para un nuevo dia se agrega un elemento
        if(data.type === 'payment'){
          this.grafData.egresos.push(-1*Number(data.amount) as never)
          this.grafData.ingresos.push(0 as never)
        }else{
          this.grafData.ingresos.push(data.amount as never)
          this.grafData.egresos.push(0 as never)
        }
        index++
        dayForChart = this.dateTimeS.isoToDate(data.date)
        this.grafData.fechas.push(dayForChart as never)
      }
    })
    this.chart='ingresosEgresos'

  }

  fillEmptysDays(){

  }

  mesActual(){

  }

  mesAnterior(){

  }

  todo(){
    //chart
    this.grafData.egresos.forEach((data,index) => { this.grafData.egresos[index] = data>0 ? -data : data }) //Cambia el signo
    this.chart='ingresosEgresos'
    //table
    this.displayedItems = this.table
    this.titulo="Ingresos y egresos" 
    this.displayedColumns=[ "date","type","concept","amount"]
    this.columnsHeader=[ "Fecha","Tipo","Concepto","Monto"]
  }

  ingresos(){
    //chart
    this.chart='ingresos'
    //table
    let filter = this.table.filter((ie:Transaction)=>ie.type=='Ingreso')
    this.displayedItems = filter as any
    this.titulo="Ingresos" 
    this.displayedColumns=[ "date","concept","amount"]
    this.columnsHeader=[ "Fecha","Concepto","Monto"]
  }

  egresos(){
    //chart
    this.grafData.egresos.forEach((data,index) => { this.grafData.egresos[index] = data<0 ? -data : data }) //Cambia el signo
    this.chart='egresos'
    //table
    let filter = this.table.filter((ie:Transaction)=>ie.type=='Egreso')
    this.displayedItems = filter as any
    this.titulo="Egresos" 
    this.displayedColumns=[ "date","concept","amount"]
    this.columnsHeader=[ "Fecha","Concepto","Monto"]
  }

}
