import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Investment } from 'src/app/core/interfaces/Investment';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'ew-plazo-fijo',
  templateUrl: './plazo-fijo.component.html',
  styleUrls: ['./plazo-fijo.component.scss']
})
export class PlazoFijoComponent implements OnInit {

  fixedDepositForm: FormGroup | any;

  saldo: number = 0;
  userId: number = -1;
  accountId: number = -1;
  investments: Array<Investment> = [];

  loading: boolean = true;
  displayedColumns=["creation_date", "accountId", "amount"];
  columnsHeader=["Fecha de creación", "Cuenta N°", "Monto"];

  constructor(private http: HttpService) {
    this.fixedDepositForm = new FormGroup({
      monto: new FormControl('',  [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0.01)]),
    })
  }

  ngOnInit(): void {

    // traer cuentas en pesos del usuario
    this.http.get('/accounts/me').subscribe({
      next: (res: any) => {

        if(res.length !== 0) {
          this.saldo = res[0].money;
          this.userId = res[0].userId;
          this.accountId = res[0].id;

          this.fixedDepositForm.get('monto').setValidators(
            [Validators.required,
              Validators.pattern("^[0-9]*$"),
              Validators.min(0.01),
              Validators.max(this.saldo)]);
          this.fixedDepositForm.get('monto').updateValueAndValidity();
        } else {
          // open dialog Debes abrir una cuenta para realizar una inversion
        }
      },
      error: err => console.log(err)
    })

    // traer listado de inversiones
    this.http.get('/fixeddeposits').subscribe({
      next: (res: any) => {        
        this.investments = res.data;
        this.investments.forEach((i: any) => {
          i.creation_date = i.creation_date.slice(0, -14);
        });
        
        this.loading = false;
      },
      error: err => console.log(err)
    })
  }

  submit(): void {
    let date = new Date().toLocaleDateString('en-CA');

    // restar saldo de la cuenta
    this.http.post('/accounts/1', {
      "amount": this.fixedDepositForm.controls.monto.value,
      "concept": "Inversion plazo fijo",
      // "date": date,
      "type": "payment",
      // "accountId": this.accountId,
      // "userId": this.userId,
      // "to_account_id": 5
    }).subscribe({
      next: res => {
        // console.log(res);
        
      },
      error: err => console.log(err)
      
    })
    
    // crear plazo fijo
    this.http.post('/fixeddeposits', {
      "userId": this.userId,
      "accountId": this.accountId,
      "amount": this.fixedDepositForm.controls.monto.value,
      "creation_date": date,
      "closing_date": "2022-11-26"
    }).subscribe({
      next: res => {
        // open dialog
        
      },
      error: err => console.error(err)
      
    })

  }

}
