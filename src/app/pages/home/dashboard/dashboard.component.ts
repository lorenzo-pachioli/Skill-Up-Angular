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
import { transactions_REQ, trTopupPaymentData_REQ, trTopupPaymentFilterChart_REQ, trBalanceData_REQ } from 'src/app/core/state/actions/transaction.actions';
import { chartTopPayData, trQueryMade, selectAllTransactions, tableData } from 'src/app/core/state/selectors/transactions.selectors';
import { AppState } from 'src/app/core/state/app.state';
import { ChartTopPayData, TableData } from 'src/app/core/state/interfaces/state.interface';
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
  list = [];
  title = '';
  columns = [];
  loading: boolean = true

  @Input() accountStatus: IBalance[] = []
  @Output() accountStatusChange: EventEmitter<IBalance[]> = new EventEmitter();

  trQueryMade$: Observable<any> = new Observable();
  charData$: Observable<any> = new Observable();
  tableData$: Observable<any> = new Observable();

  constructor(
    private exchangeService: ExchangeService,
    public http: HttpService,
    private dev: DevelopmentOnlyService,
    private store: Store<AppState>
  ) {
    this.trQueryMade$ = this.store.select(trQueryMade);
    this.tableData$ = this.store.select(tableData);
    this.charData$ = this.store.select(chartTopPayData);
  }

  ngOnInit(): void {
    this.exchangeService.get().subscribe((data) => {
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

  todo() {
    this.store.dispatch(
      trTopupPaymentFilterChart_REQ({ filter: 'ingresosEgresos' })
    );
  }

  ingresos() {
    this.store.dispatch(trTopupPaymentFilterChart_REQ({ filter: 'ingresos' }));
  }

  egresos() {
    this.store.dispatch(trTopupPaymentFilterChart_REQ({ filter: 'egresos' }));
  }


}
