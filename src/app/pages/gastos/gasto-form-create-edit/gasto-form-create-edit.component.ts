import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/core/services/http.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IBill } from 'src/app/core/interfaces/Bills';
@Component({
  selector: 'ew-gasto-form-create-edit',
  templateUrl: './gasto-form-create-edit.component.html',
  styleUrls: ['./gasto-form-create-edit.component.scss']
})
export class GastoFormCreateEditComponent implements OnInit {

  loading = false;
  error = false;
  successfully = false;
  today = new Date();
  accounts: any;
  amount = new FormControl(Validators.required);
  concept = new FormControl('', Validators.minLength(4));
  to_account_id = new FormControl(Validators.required);
  account_id = new FormControl(Validators.required);
  date = new FormControl(this.today);
  newBill = new FormGroup({
    amount: this.amount,
    concept: this.concept,
    to_account_id: this.to_account_id,
    accountId: this.account_id,
    date: this.date
  });

  @Input() billResponse: IBill | undefined;
  @Output() billResponseChange: EventEmitter<IBill> = new EventEmitter();

  constructor(
    private http: HttpService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.http.get('/accounts/me').subscribe({
      next: (res) => {
        this.accounts = res
      },
      error: () => this.errorHandler()
    }
    )
  }

  createBill(): void {
    this.openDialog('Confirmar', 'Esta seguro que quiere crear el pago?');
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
          concept: this.newBill.value.concept,
          date: this.setDate(this.newBill.value.date),
          type: 'payment',
          accountId: this.newBill.value.accountId,
          userId: 2267,
          to_account_id: this.newBill.value.to_account_id
        }

        this.http.post('/transactions', billComplete).subscribe({
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
    console.log(res);
    this.billResponseChange.emit(res);
  }

  private errorHandler(): void {
    this.loading = false;
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 1500);
  }

  private setDate(date: any = this.today): string {
    const hours = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getMinutes()}`
    const toDate = new Date(date)
    const day = toDate.getDate();
    const month = toDate.getMonth() + 1;
    const year = toDate.getFullYear();

    if (day === this.today.getDate()) {
      return `${year}/${month}/${day} ${hours}`
    }
    return `${year}/${month}/${day} 01:00:00`
  }

  resetForm(): void {
    this.loading = false;
    this.error = false;
    this.successfully = false;
    this.newBill.reset();
  }
}
