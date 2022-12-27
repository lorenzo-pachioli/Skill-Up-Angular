import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/core/services/http.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IBill } from 'src/app/core/interfaces/Bills';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { selectedAccount } from 'src/app/core/state/selectors/accounts.selectors';
import { MatSelectChange } from '@angular/material/select';
import { accountToggle } from 'src/app/core/state/actions/account.actions';
import { selectedUser } from 'src/app/core/state/auth/auth.reducer';

@Component({
  selector: 'ew-gasto-form-retirar',
  templateUrl: './gasto-form-retirar.component.html',
  styleUrls: ['./gasto-form-retirar.component.scss']
})
export class GastoFormRetirarComponent implements OnInit, OnDestroy {

  loading = false;
  error = false;
  successfully = false;
  today = new Date();
  accounts: any;
  userId!: number;
  amount = new FormControl('', Validators.compose([Validators.required, Validators.min(1)]));
  account_id = new FormControl(Validators.required);
  newBill = new FormGroup({
    amount: this.amount,
    accountId: this.account_id
  });

  selectedAccount$: Observable<any> = new Observable();
  selectedAccount: Subscription = new Subscription;
  currentUser$: Observable<any> = new Observable();
  currentUser: Subscription = new Subscription;
  httpGet: Subscription = new Subscription;
  httpPost: Subscription = new Subscription;
  @Input() billResponse: IBill | undefined;
  @Output() billResponseChange: EventEmitter<IBill> = new EventEmitter();

  constructor(
    private http: HttpService,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.selectedAccount$ = this.store.select(selectedAccount);
    this.currentUser$ = this.store.select(selectedUser);
    this.selectedAccount = this.selectedAccount$.subscribe(value => this.account_id.setValue(value));
    this.currentUser = this.currentUser$.subscribe(value => this.userId = value.id);
  }

  ngOnInit(): void {
    this.httpGet = this.http.get('/accounts/me').subscribe({
      next: (res) => {
        this.accounts = res
      },
      error: () => this.errorHandler()
    }
    )
  }

  ngOnDestroy(): void {
    this.selectedAccount.unsubscribe();
    this.currentUser.unsubscribe();
    this.httpGet.unsubscribe();
    this.httpPost.unsubscribe();
  }

  createBill(): void {
    this.openDialog('Confirmar', 'Esta seguro que quiere realizar la extracción?');
  }

  private openDialog(title: string, content: string): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      disableClose: true,
      data: {
        title,
        content
      }
    }).afterClosed().subscribe(response => {

      if (response.data) {
        this.loading = true;
        const billComplete = {
          amount: this.newBill.value.amount,
          concept: 'Retiro de dinero',
          date: this.today,
          type: 'payment',
          accountId: this.setAccount(this.newBill.value.accountId),
          userId: this.userId,
          to_account_id: 5
        }

        this.httpPost = this.http.post('/transactions', billComplete).subscribe({
          next: (res) => this.handleNext(res),
          error: () => this.errorHandler(),
          complete: () => {
            this.successfully = true;
            setTimeout(() => {
              this.successfully = false;
            }, 1500);
            this.newBill.reset()
          }
        }
        )
      }
    })
  }

  private handleNext(res: any): void {
    this.loading = false;
    const retiro = {
      ...res,
      type: null,
      to_account_id: null
    }
    this.billResponseChange.emit(retiro);
  }

  private errorHandler(): void {
    this.loading = false;
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 1500);
  }

  private setAccount(account: any): number {
    if (account === 'ARSAccount') {
      return this.accounts[0].id;
    }
    return this.accounts[1].id;
  }

  setCurrentAccount(event: MatSelectChange): void {
    this.store.dispatch(accountToggle({ selectedAccount: event.value }));
  }

  resetForm(): void {
    this.loading = false;
    this.error = false;
    this.successfully = false;
    this.newBill.reset();
  }
}
