import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart, registerables  } from 'node_modules/chart.js'
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/state/app.state';
import { ChartBalancesData, ChartTopPayData } from 'src/app/core/state/interfaces/state.interface';
import { chartBalancesData, chartTopPayData } from 'src/app/core/state/selectors/transactions.selectors';
Chart.register(...registerables);

@Component({
  selector: 'ew-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  //Determina cual grafico cargar
  @Input() origin:string = ''

  //Ejecucion por input
  _chart:string=''
  get chart(): string {
      return this._chart;
  }
  @Input() set chart(clave: string) {
      this._chart = clave;

      if(this.instance){
        this.instance.destroy()
      }

      this.renderChart();
  }
  @Input() times:any = []
  @Input() set0:any = []
  @Input() set1:any = []

  //Pose la instancia de Chart para manipular el grafico
  instance:Chart | undefined

  //Ejecucion por Estado
  charTopPayData$: Observable<any> = new Observable()
  charBalancesData$: Observable<any> = new Observable()
  
  
  constructor(
    private store:Store<AppState>
  ) {
    this.charTopPayData$ = this.store.select(chartTopPayData) 
    this.charBalancesData$ = this.store.select(chartBalancesData) 
  }

  ngOnInit(): void {
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
          this.chart = resp.chart   //Dispara el redibujado <=> Tiene que ir ultimo
        }
      })
    }else if(this.origin=='balances'){
      this.charBalancesData$.subscribe((resp:ChartBalancesData|null)=>{
      console.log('Estoy en balances',resp)
        if(resp!==null){
          this.times = resp.fechas
          this.set0 = resp.balanceARS
          this.set1 = resp.balanceUSD
          this.chart = resp.chart
        }
      })
    }

  }

  renderChart(){
    if(this.origin=='balances'){
      this.instance = new Chart('myChart', {
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
      this.instance = new Chart('myChart', {
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
        labels: this.times,
        datasets: [
          {
            label: 'Ingresos',
            data: this.set0,
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
            data: this.set1,
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
        labels: this.times,
        datasets: [
          {
            label: 'Ingresos',
            data: this.set0,
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
        labels: this.times,
        datasets: [
          {
            label: 'Egresos',
            data: this.set1,
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
        labels: this.times,
        datasets: [
          {
            label: 'ARS',
            data: this.set0,
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
            data: this.set1,
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


  mesActual(){

  }

  mesAnterior(){
    
  }

  ultimos30(){

  }
}
