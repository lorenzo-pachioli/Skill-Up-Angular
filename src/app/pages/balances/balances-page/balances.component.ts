import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { IBalance } from 'src/app/core/interfaces/Balance';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { chartTopPayData, trQueryMade } from 'src/app/core/state/selectors/transactions.selectors';
import { Observable } from 'rxjs';
import { transactions_REQ, trBalanceData_REQ } from 'src/app/core/state/actions/transaction.actions';
import { accounts_REQ } from 'src/app/core/state/actions/account.actions';
import { accountsQueryMade, selectAccounts } from 'src/app/core/state/selectors/accounts.selectors';
import { AccountsStates } from 'src/app/core/state/interfaces/state.interface';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit {

  loading = true;
  @Input() accountStatus: IBalance[] = []
  @Output() accountStatusChange: EventEmitter<IBalance[]> = new EventEmitter();

  trQueryMade$: Observable<any> = new Observable()
  charData$: Observable<any> = new Observable()

  accountsQueryMade$: Observable<any> = new Observable()
  selectAccounts$: Observable<any> = new Observable()

  accountsQueryMade: boolean = false
  trQueryMade: boolean = false

  constructor(
    private http: HttpService,
    private store: Store<AppState>
  ) {
    this.trQueryMade$ = this.store.select(trQueryMade)
    this.charData$ = this.store.select(chartTopPayData)

    //this.accountsQueryMade$ = this.store.select(accountsQueryMade)
    this.selectAccounts$ = this.store.select(selectAccounts)
  }

  ngOnInit(): void {
    this.http.get('/accounts/me').subscribe(response => {
      this.handleNext(response)
      this.loading = false
    })

    //Iniciador del estado para las transacciones
    this.trQueryMade$.subscribe(made => {
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
    this.selectAccounts$.subscribe((accountsStates: AccountsStates) => {
      if (accountsStates.AccountsQueryMade) { //Si los datos ya estan cargados
        this.accountsQueryMade = true
        if (this.accountsQueryMade && this.trQueryMade) {
          this.store.dispatch(trBalanceData_REQ())//Procesa el grafico
        }
      }/*else{ //Si no estan cargados se los pide a la API
        this.store.dispatch(accounts_REQ())
      }*/
    })
    /*     this.http.get('/transactions').subscribe({
          next: (res) => this.mappingResponse(res),
          error: (err) => console.log(err),
          complete: () => this.loading = false
        }) */
  }

  handleNext(res: any): void {
    this.accountStatus = res;
    this.accountStatusChange.emit(res);
  }

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
}
