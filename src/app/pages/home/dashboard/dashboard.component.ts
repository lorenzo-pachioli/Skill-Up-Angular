import { Component, Input, OnInit } from '@angular/core';
import { ExchangeService } from 'src/app/core/services/exchange.service';
import { HttpService } from 'src/app/core/services/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Investment } from 'src/app/core/interfaces/Investment';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Observable } from 'rxjs';
import { DevelopmentOnlyService } from 'src/app/core/development-only/development-only.service';
import { Store } from '@ngrx/store';
import {
  transactions_REQ,
  trTopupPaymentData_REQ,
  trTopupPaymentFilter_REQ,
} from 'src/app/core/state/actions/transaction.actions';
import {
  chartTopPayData,
  queryMade,
  selectAllTransactions,
  tableData,
} from 'src/app/core/state/selectors/transactions.selectors';
import { AppState } from 'src/app/core/state/app.state';
import {
  ChartTopPayData,
  TableData,
} from 'src/app/core/state/interfaces/state.interface';

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

  fixedDepositForm: FormGroup | any;

  saldo: number = 0;
  userId: number = -1;
  accountId: number = -1;
  investments: Array<Investment> = [];

  loading: boolean = true;
  displayedColumns = ['creation_date', 'accountId', 'amount'];
  columnsHeader = ['Fecha de creación', 'Cuenta N°', 'Monto'];

  saldosList = [
    { concepto: 'Entrada', cantidad: 4500 },
    { concepto: 'Deposito', cantidad: 2500 },
    { concepto: 'Mercado Pago', cantidad: 1500 },
  ];
  name = 'perro';
  animal = 'dog';

  queryMade$: Observable<any> = new Observable();
  tableData$: Observable<any> = new Observable();
  charData$: Observable<any> = new Observable();

  list = [];
  title = '';
  columns = [];

  constructor(
    private exchangeService: ExchangeService,
    public http: HttpService,
    public dialog: MatDialog,
    private dev: DevelopmentOnlyService,
    private store: Store<AppState>
  ) {
    this.queryMade$ = this.store.select(queryMade);
    this.tableData$ = this.store.select(tableData);
    this.charData$ = this.store.select(chartTopPayData);
    this.fixedDepositForm = new FormGroup({
      monto: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0.01),
      ]),
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit(): void {
    this.exchangeService.get().subscribe((data) => {
      console.log(data);
      this.exchange = data;
    });

    // traer listado de inversiones
    this.http.get('/fixeddeposits').subscribe({
      next: (res: any) => {
        this.investments = res.data;
        this.investments.forEach((i: any) => {
          i.creation_date = i.creation_date.slice(0, -14);
        });

        this.loading = false;
      },
      error: (err) => console.log(err),
    });

    this.queryMade$.subscribe((made) => {
      if (made) {
        //Si los datos ya estan cargados
        this.store.dispatch(trTopupPaymentData_REQ()); //Procesa la tabla y el grafico
      } else {
        //Si no estan cargados se los pide a la API
        this.store.dispatch(transactions_REQ());
      }
    });

    this.tableData$.subscribe((resp: TableData | null) => {
      if (resp !== null) {
        this.list = resp.list as never;
        this.title = resp.title;
        this.columns = resp.columns as never;
        this.loading = false;
      }
    });
  }

  todo() {
    this.store.dispatch(
      trTopupPaymentFilter_REQ({ filter: 'ingresosEgresos' })
    );
  }

  ingresos() {
    this.store.dispatch(trTopupPaymentFilter_REQ({ filter: 'ingresos' }));
  }

  egresos() {
    this.store.dispatch(trTopupPaymentFilter_REQ({ filter: 'egresos' }));
  }

  submit(): void {}
}
