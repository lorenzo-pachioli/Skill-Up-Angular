import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { IBalance } from 'src/app/core/interfaces/Balance';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit {

  loading = true;
  @Input() accountStatus: IBalance[] = []
  @Output() accountStatusChange: EventEmitter<IBalance[]> = new EventEmitter();

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.get('/accounts/me').subscribe({
      next: (res) => this.handleNext(res),
      error: (err) => console.log(err),
      complete: () => this.loading = false
    })
    this.http.get('/transactions').subscribe({
      next: (res) => this.mappingResponse(res),
      error: (err) => console.log(err),
      complete: () => this.loading = false
    })
  }

  handleNext(res: any): void {
    this.accountStatus = res;
    this.accountStatusChange.emit(res);
  }

  mappingResponse(res: any): void {
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
