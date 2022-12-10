import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart, ChartMeta, registerables  } from 'node_modules/chart.js'
import { first, Observable } from 'rxjs';
import { ChartService } from 'src/app/core/services/chart.service';
import { DateTimeService } from 'src/app/core/services/date-time.service';
import { AppState } from 'src/app/core/state/app.state';
import { ChartBalancesData, ChartTopPayData, TransactionsState } from 'src/app/core/state/interfaces/state.interface';
import { chartBalancesData, chartTopPayData, selectTransactions } from 'src/app/core/state/selectors/transactions.selectors';
Chart.register(...registerables);

@Component({
  selector: 'ew-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  origin : string = ''
  chart: string = ''
  times:any = []
  timesFiltered:any = []
  set0:any = []
  set0Filtered:any = []
  set1:any = []
  set1Filtered:any = []

  //Ejecucion por Estado
  charTopPayData$: Observable<any> = new Observable()
  charBalancesData$: Observable<any> = new Observable()
  transactionsData$: Observable<any> = new Observable()
  
  //Filtro para los dias
  timeFilter:'last30'|'currentMonth'|'lastMonth' = 'last30'
  
  constructor(
    private store:Store<AppState>,
    private dateTimeS: DateTimeService,
    private charS:ChartService
  ) {
    this.charTopPayData$ = this.store.select(chartTopPayData) 
    this.charBalancesData$ = this.store.select(chartBalancesData)
    this.transactionsData$ = this.store.select(selectTransactions)
  }

  ngOnInit(): void {
    this.transactionsData$.subscribe((resp:TransactionsState|null)=>{
      if(resp!==null){
        this.origin = resp.origin
        this.subscribe()
      }
    })

    //Con los datos ya cargados se tiene que esperar a que la vista termine de cargar para graficar
    //Con AfterViewInit el canvas sigue sin terminar su render ^('-')^
    if(this.charS.instance){
      setTimeout(() => {
        this.renderChart()
      }, 100);
    }
  }

  subscribe(){
    if(this.origin=='ingresosEgresos'){
      this.charTopPayData$.subscribe((resp:ChartTopPayData|null)=>{
        if(resp!==null){
          this.times = resp.fechas
          this.set0 = resp.ingresos
          this.set1 = resp.egresos  
          if(resp.chart  ==='ingresosEgresos'){
            this.set1 =  resp.egresos.map((val:any)=>{ 
                return Number(val)>0 ? -1*Number(val) : val})
          }
          this.chart = resp.chart 
          this.renderChart()
        }
      })
    }else if(this.origin=='balances'){
      this.charBalancesData$.subscribe((resp:ChartBalancesData|null)=>{
        if(resp!==null){
          this.times = resp.fechas
          this.set0 = resp.balanceARS
          this.set1 = resp.balanceUSD
          this.chart = resp.chart
          this.renderChart()
        }
      })
    }
  }
  

  renderChart(){
    this.filterDays()

    if(this.charS.instance){
      this.charS.instance.destroy()
    }

    if(this.origin=='balances'){
      this.charS.instance = new Chart('myChart', {
        type: 'line',
        data: this.getchartsData(),
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            title: {
              display: true,
              text: 'Balance'
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              // grid line settings
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            },
          }
        },

      })
    }else{
      this.charS.instance = new Chart('myChart', {
        type: 'bar',
        data: this.getchartsData(),
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      })
    }
  }
      
  getchartsData(){
    let chartsData={
      test:{ 
        labels: ['2022/08/05','2022/08/06','2022/08/07','2022/08/08','2022/08/09','2022/08/10','2022/08/11'],
        datasets: [
          {
            label: 'My First Dataset',
            data:  [65, 0, 100, 110, 81, 56, -55, -40],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }
        ]
      },
      
      ingresosEgresos:{ 
        labels: this.timesFiltered,
        datasets: [
          {
            label: 'Ingresos',
            data: this.set0Filtered,
            backgroundColor: [
              'rgba(99, 255, 132, 0.2)'
            ],
            borderColor: [
              'rgb(99, 255, 132)'
            ],
            borderWidth: 1
          },
          {
            label: 'Egresos',
            data: this.set1Filtered,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)'
            ],
            borderWidth: 1
          }
        ]
      },
      
      ingresos:{ 
        labels: this.timesFiltered,
        datasets: [
          {
            label: 'Ingresos',
            data: this.set0Filtered,
            backgroundColor: [
              'rgba(99, 255, 132, 0.2)'
            ],
            borderColor: [
              'rgb(99, 255, 132)'
            ],
            borderWidth: 1
          }
        ]
      },
      
      egresos:{ 
        labels: this.timesFiltered,
        datasets: [
          {
            label: 'Egresos',
            data: this.set1Filtered,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)'
            ],
            borderWidth: 1
          }
        ]
      },

      balances:{
        labels: this.timesFiltered,
        datasets: [
          {
            label: 'ARS',
            data: this.set0Filtered,
            backgroundColor: [
              'rgba(99, 255, 132, 0.2)'
            ],
            borderColor: [
              'rgb(99, 255, 132)'
            ],
            yAxisID: 'y',
          },
          {
            label: 'USD',
            data: this.set1Filtered,
            backgroundColor: [
              'rgba(99, 132, 255, 0.2)'
            ],
            borderColor: [
              'rgb(99, 132, 255)'
            ],
            yAxisID: 'y1',
          }
        ]
      },
    }
    return chartsData[this.chart as keyof typeof chartsData]
  }

  filterDays(){
    let firstDay = new Date()
    let lastDay = new Date()
    if(this.timeFilter=='last30'){
      firstDay.setDate(firstDay.getDate()-29)
    }else if(this.timeFilter=='currentMonth'){
      firstDay.setDate(1)
      lastDay.setMonth(lastDay.getMonth()+1)
      lastDay.setDate(0)
    }else if(this.timeFilter=='lastMonth'){
      firstDay.setMonth(firstDay.getMonth()-1)
      firstDay.setDate(1)
      lastDay.setDate(0)
    }
    this.timesFiltered = []
    this.set0Filtered = []
    this.set1Filtered = []
    let index = this.times.indexOf(this.dateTimeS.isoToDate(firstDay.toISOString()))
    let daysBetween = Math.round(lastDay.getTime()-firstDay.getTime())/(86400000) + 1
    for (let i = 0; i < daysBetween; i++) {
      //this.timesFiltered.push(this.dateTimeS.isoToDate())
      this.timesFiltered.push(this.times[index+i])
      this.set0Filtered.push(this.set0[index+i])
      this.set1Filtered.push(this.set1[index+i])
    }
  }

  ultimos30(){
    this.timeFilter='last30'
    this.renderChart()
  }

  mesActual(){
    this.timeFilter='currentMonth'
    this.renderChart()
  }

  mesAnterior(){
    this.timeFilter='lastMonth'
    this.renderChart()
  }

}
