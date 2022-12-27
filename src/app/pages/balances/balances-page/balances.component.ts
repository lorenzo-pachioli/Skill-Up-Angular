import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { IBalance } from 'src/app/core/interfaces/Balance';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { chartTopPayData, trQueryMade } from 'src/app/core/state/selectors/transactions.selectors';
import { Observable, Subscription } from 'rxjs';
import { transactions_REQ, trBalanceData_REQ } from 'src/app/core/state/actions/transaction.actions';
import { selectAccounts } from 'src/app/core/state/selectors/accounts.selectors';
import { AccountsStates } from 'src/app/core/state/interfaces/state.interface';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit, OnDestroy {

  loading = true;
  @Input() accountStatus: IBalance[] = []
  @Output() accountStatusChange: EventEmitter<IBalance[]> = new EventEmitter();

  trQueryMade$: Observable<any> = new Observable()
  trQueryMadeSub: Subscription = new Subscription;
  charData$: Observable<any> = new Observable()

  accountsQueryMade$: Observable<any> = new Observable()
  selectAccounts$: Observable<any> = new Observable()
  selectAccounts: Subscription = new Subscription;

  httpGet: Subscription = new Subscription;

  accountsQueryMade: boolean = false
  trQueryMade: boolean = false

  constructor(
    private http: HttpService,
    private store: Store<AppState>
  ) {
    this.trQueryMade$ = this.store.select(trQueryMade);
    this.charData$ = this.store.select(chartTopPayData);
    this.selectAccounts$ = this.store.select(selectAccounts);
  }

  ngOnInit(): void {
    this.http.get('/accounts/me').subscribe(response => {
      this.handleNext(response)
      this.loading = false
    })

    //Iniciador del estado para las transacciones
    this.trQueryMadeSub = this.trQueryMade$.subscribe(made => {
      if (made) { //Si los datos ya estan cargados
        this.trQueryMade = true
        if (this.accountsQueryMade && this.trQueryMade) {
          this.store.dispatch(trBalanceData_REQ())//Procesa el grafico
        }
      } else { //Si no estan cargados se los pide a la API
        this.store.dispatch(transactions_REQ())
      }
    })

    //Iniciador del estado para las cuentas
    this.selectAccounts = this.selectAccounts$.subscribe((accountsStates: AccountsStates) => {
      if (accountsStates.AccountsQueryMade) { //Si los datos ya estan cargados
        this.accountsQueryMade = true
        if (this.accountsQueryMade && this.trQueryMade) {
          this.store.dispatch(trBalanceData_REQ())//Procesa el grafico
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.httpGet.unsubscribe();
    this.selectAccounts.unsubscribe();
    this.trQueryMadeSub.unsubscribe();
  }

  handleNext(res: any): void {
    this.accountStatus = res;
    this.accountStatusChange.emit(res);
  }
}
