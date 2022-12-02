import { Component, OnInit } from '@angular/core';
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

  ingresosEgresos: Transactions | undefined

  loading:boolean=true
  displayedItems=[]
  displayedColumns=['']
  columnsHeader=['']
  titulo=''



  constructor( private httpS:HttpService, private dateTimeS: DateTimeService ) { }

  ngOnInit(): void {
    this.httpS.get('/accounts/me').subscribe(resp=>console.log(resp))

    /*
    this.httpS.post('/transactions',t1,true).subscribe(resp=>console.log(resp))*/
    this.httpS.get('/transactions').subscribe({
      next:res=>{
        console.log(res)

        this.ingresosEgresos = (res as Transactions)
        this.ingresosEgresos.data.forEach(data => {
          data.date = this.dateTimeS.isoToDateTime(data.date) 
          data.type = data.type === 'payment' ? 'Egreso' : 'Ingreso'
        })
          

        this.loading=false
        this.todo()
      },
      error:err=>{  

      }
    })
  }

  todo(){
    this.displayedItems = this.ingresosEgresos!.data as any
    this.titulo="Ingresos y egresos" 
    this.displayedColumns=[ "date","type","concept","amount"]
    this.columnsHeader=[ "Fecha","Tipo","Concepto","Monto"]
  }

  ingresos(){
    let filter = this.ingresosEgresos!.data.filter(io=>io.type=='Ingreso')
    this.displayedItems = filter as any
    this.titulo="Ingresos" 
    this.displayedColumns=[ "date","concept","amount"]
    this.columnsHeader=[ "Fecha","Concepto","Monto"]
  }

  egresos(){
    let filter = this.ingresosEgresos!.data.filter(io=>io.type=='Egreso')
    this.displayedItems = filter as any
    this.titulo="Egresos" 
    this.displayedColumns=[ "date","concept","amount"]
    this.columnsHeader=[ "Fecha","Concepto","Monto"]
  }

}
