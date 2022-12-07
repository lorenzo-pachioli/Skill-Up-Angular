import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/core/services/http.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IBill } from 'src/app/core/interfaces/Bills';

@Component({
  selector: 'ew-gasto-form-retirar',
  templateUrl: './gasto-form-retirar.component.html',
  styleUrls: ['./gasto-form-retirar.component.scss']
})
export class GastoFormRetirarComponent implements OnInit {

  loading = false;
  error = false;
  successfully = false;
  today = new Date();
  accounts: any;
  amount = new FormControl(Validators.required);
  account_id = new FormControl(Validators.required);
  newBill = new FormGroup({
    amount: this.amount,
    accountId: this.account_id
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
          accountId: this.newBill.value.accountId,
          userId: 2267,
          to_account_id: 5
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

  resetForm(): void {
    this.loading = false;
    this.error = false;
    this.successfully = false;
    this.newBill.reset();
  }
}
