import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

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
  amount = new FormControl(this.customValidator);
  concept = new FormControl('', Validators.minLength(10));
  to_account_id = new FormControl();
  newBill = new FormGroup({
    amount: this.amount,
    concept: this.concept,
    to_account_id: this.to_account_id
  });

  constructor(
    private http: HttpService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  customValidator(): ValidatorFn {
    const NUMERIC_PATTREN = '^-?[0-9]\\d*(\\.\\d*)?$';
    console.log('some');

    return (control: AbstractControl): ValidationErrors | null => {
      console.log(RegExp(NUMERIC_PATTREN, control.value));
      if (RegExp(NUMERIC_PATTREN, control.value)) {
        return { nonZero: true };
      } else {
        return null;
      }
    };
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
          date: this.today,
          type: "topup",
          accountId: 1,
          userId: 4,
          to_account_id: this.newBill.value.to_account_id
        }

        this.http.post('/transactions', billComplete).subscribe({
          next: () => this.handleNext(),
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

  private handleNext(): void {
    this.loading = false;
  }

  private errorHandler(): void {
    this.loading = false;
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 1500);
  }
}
