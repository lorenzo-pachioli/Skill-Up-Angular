import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables  } from 'node_modules/chart.js'
Chart.register(...registerables);

@Component({
  selector: 'ew-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  _chart:string=''
  get chart(): string {
      return this._chart;
  }
  @Input() set chart(clave: string) {
      this._chart = clave;
      let canva = <HTMLCanvasElement> document.getElementById('myChart')

      if(this.instance){
        this.instance.destroy()
      }

      this.renderChart();
  }
  @Input() times:any = []
  @Input() set0:any = []
  @Input() set1:any = []

  instance:Chart | undefined

  constructor() { }

  ngOnInit(): void { }

  renderChart(){
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
    }

    return chartsData[this.chart as keyof typeof chartsData]
  }



}
