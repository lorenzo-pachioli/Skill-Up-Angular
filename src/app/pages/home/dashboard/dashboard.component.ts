import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExchangeService } from 'src/app/core/services/exchange.service';
import { HttpService } from 'src/app/core/services/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Investment } from 'src/app/core/interfaces/Investment';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Observable } from 'rxjs';
import { DevelopmentOnlyService } from 'src/app/core/development-only/development-only.service';
import { Store } from '@ngrx/store';
<<<<<<< HEAD
import { transactions_REQ, trTopupPaymentData_REQ, trTopupPaymentFilter_REQ, trBalanceData_REQ} from 'src/app/core/state/actions/transaction.actions';
import { chartTopPayData, queryMade, selectAllTransactions, tableData} from 'src/app/core/state/selectors/transactions.selectors';
import { AppState } from 'src/app/core/state/app.state';
import { ChartTopPayData, TableData} from 'src/app/core/state/interfaces/state.interface';
=======
import { transactions_REQ, trTopupPaymentData_REQ, trTopupPaymentFilterChart_REQ, trBalanceData_REQ } from 'src/app/core/state/actions/transaction.actions';
import { chartTopPayData, trQueryMade, selectAllTransactions, tableData } from 'src/app/core/state/selectors/transactions.selectors';
import { AppState } from 'src/app/core/state/app.state';
import { ChartTopPayData, TableData } from 'src/app/core/state/interfaces/state.interface';
>>>>>>> c2c79f904f0a7357960f1c024bf0576937c0f2fc
import { IBalance } from 'src/app/core/interfaces/Balance';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  titulo: string = 'Resumen de cuenta';

  exchange: any = [];
  res!: Number;
  Monedas: any = [
    { value: '1', viewValue: 'ARS a USD' },
    { value: '2', viewValue: 'USD a ARS' },
  ];
  seleccionada: string = this.Monedas[0].value;
<<<<<<< HEAD

  list = [];
  title = '';
  columns = [];

  loading:boolean=true
  @Input() accountStatus: IBalance[] = []
  @Output() accountStatusChange: EventEmitter<IBalance[]> = new EventEmitter();

  queryMade$: Observable<any> = new Observable();

  charData$: Observable<any> = new Observable();

=======
  list = [];
  title = '';
  columns = [];
  loading: boolean = true

  @Input() accountStatus: IBalance[] = []
  @Output() accountStatusChange: EventEmitter<IBalance[]> = new EventEmitter();

  trQueryMade$: Observable<any> = new Observable();
  charData$: Observable<any> = new Observable();
>>>>>>> c2c79f904f0a7357960f1c024bf0576937c0f2fc
  tableData$: Observable<any> = new Observable();

  constructor(
    private exchangeService: ExchangeService,
    public http: HttpService,
    private dev: DevelopmentOnlyService,
    private store: Store<AppState>
  ) {
<<<<<<< HEAD
    this.queryMade$ = this.store.select(queryMade);
=======
    this.trQueryMade$ = this.store.select(trQueryMade);
>>>>>>> c2c79f904f0a7357960f1c024bf0576937c0f2fc
    this.tableData$ = this.store.select(tableData);
    this.charData$ = this.store.select(chartTopPayData);
  }

  ngOnInit(): void {
    this.exchangeService.get().subscribe((data) => {
<<<<<<< HEAD
      console.log(data);
      this.exchange = data;
    });

    
    this.http.get('/accounts/me').subscribe({
      next: (res) => this.handleNext(res),
      error: (err) => console.log(err),
      complete: () => this.loading = false
    })

    this.queryMade$.subscribe(made=>{
      console.log('EN balance', made)
      if(made){ //Si los datos ya estan cargados
        this.store.dispatch(trBalanceData_REQ())//Procesa el grafico
      }else{ //Si no estan cargados se los pide a la API
=======
      this.exchange = data;
    });


    this.http.get('/accounts/me').subscribe({
      next: (res) => this.handleNext(res),
      error: () => this.loading = false,
      complete: () => this.loading = false
    })

    this.trQueryMade$.subscribe(made => {
      if (made) { //Si los datos ya estan cargados
        this.store.dispatch(trBalanceData_REQ())//Procesa el grafico
      } else { //Si no estan cargados se los pide a la API
>>>>>>> c2c79f904f0a7357960f1c024bf0576937c0f2fc
        this.store.dispatch(transactions_REQ())
      }
    })


    // this.trQueryMade$.subscribe((made) => {
    //   if (made) {
    //     //Si los datos ya estan cargados
    //     this.store.dispatch(trTopupPaymentData_REQ()); //Procesa la tabla y el grafico
    //   } else {
    //     //Si no estan cargados se los pide a la API
    //     this.store.dispatch(transactions_REQ());
    //   }
    // });

    this.tableData$.subscribe((resp: TableData | null) => {
      if (resp !== null) {
        this.list = resp.list as never;
        this.title = resp.title;
        this.columns = resp.columns as never;
        this.loading = false;
      }
    });

  }

  handleNext(res: any): void {
    this.accountStatus = res;
    this.accountStatusChange.emit(res);
  }

<<<<<<< HEAD
  private mappingResponse(res: any): void {
    this.accountStatus.map(account => {
      let added = 0;
      let payments = 0;
      res.data.map((transaction: any) => {
        if (account.id === transaction.accountId) {
          if (transaction.type === 'payment') {
            payments = payments + Number(transaction.amount)
          } else {
            added = added + Number(transaction.amount)
          }
        }
      })
      account.money = added - payments;
    })
  }
  
  todo() {
    this.store.dispatch(
      trTopupPaymentFilter_REQ({ filter: 'ingresosEgresos' })
=======
  todo() {
    this.store.dispatch(
      trTopupPaymentFilterChart_REQ({ filter: 'ingresosEgresos' })
>>>>>>> c2c79f904f0a7357960f1c024bf0576937c0f2fc
    );
  }

  ingresos() {
<<<<<<< HEAD
    this.store.dispatch(trTopupPaymentFilter_REQ({ filter: 'ingresos' }));
  }

  egresos() {
    this.store.dispatch(trTopupPaymentFilter_REQ({ filter: 'egresos' }));
  }

  
=======
    this.store.dispatch(trTopupPaymentFilterChart_REQ({ filter: 'ingresos' }));
  }

  egresos() {
    this.store.dispatch(trTopupPaymentFilterChart_REQ({ filter: 'egresos' }));
  }


>>>>>>> c2c79f904f0a7357960f1c024bf0576937c0f2fc
}
