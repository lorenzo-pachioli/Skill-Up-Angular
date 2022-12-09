import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/core/interfaces/Account';
import { Investment } from 'src/app/core/interfaces/Investment';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'ew-plazo-fijo',
  templateUrl: './plazo-fijo.component.html',
  styleUrls: ['./plazo-fijo.component.scss']
})
export class PlazoFijoComponent implements OnInit {

  fixedDepositForm: FormGroup | any;

  @Input() itemChange: any;

  // variables
  saldo: number = 0;
  userId: number = -1;
  accounts: Array<Account> = [];
  accountId: number = -1;
  investments: Array<Investment> = [];
  selectedAccountId: number = -1;
  selectedAccount: Account = {
    id: -1,
    money: -1,
    createdAt: '',
    creationDate: '',
    userId: -1,
    updatedAt: '',
    isBlocked: false,
  };

  loading: boolean = true;
  displayedColumns=["creation_date", "accountId", "amount", "actions"];
  columnsHeader=["Fecha de creación", "Cuenta N°", "Monto", "Acciones"];

  constructor(private http: HttpService) {
    this.fixedDepositForm = new FormGroup({
      monto: new FormControl('',  [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0.01)]),
    })
  }

  ngOnInit(): void {

    // traer cuentas en pesos del usuario
    this.http.get('/accounts/me').subscribe({
      next: (res: any) => {
        this.accounts = res;
        if(this.accounts.length !== 0) {
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
          i.actions = '';
        });
        
        this.loading = false;
      },
      error: err => console.log(err)
    })
  }

  elegirCuenta(accountId: any){
    if (this.accounts.length > 0){
      this.selectedAccount = this.accounts.find(a => a.id === accountId)!;

      this.saldo = this.selectedAccount.money;
      this.fixedDepositForm.get('monto').setValidators(
        [Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.min(0.01),
          Validators.max(this.saldo)]);
      this.fixedDepositForm.get('monto').updateValueAndValidity();
      
      this.userId = this.selectedAccount.userId;
      this.selectedAccountId = this.selectedAccount.id;
      this.accountId = this.selectedAccount.id;
    }
  }

  submit(): void {
    let date = new Date().toLocaleDateString('en-CA');

    // restar saldo de la cuenta
    this.http.post('/transactions', {
      "amount": this.fixedDepositForm.controls.monto.value,
      "concept": "Inversion plazo fijo",
      "date": date,
      "type": "payment",
      "accountId": this.selectedAccountId,
      "userId": this.userId,
      "to_account_id": 200
    }).subscribe({
      next: res => {
      },
      error: err => console.log(err)
    })
    
    // crear plazo fijo
    this.http.post('/fixeddeposits', {
      "userId": this.userId,
      "accountId": this.selectedAccountId,
      "amount": this.fixedDepositForm.controls.monto.value,
      "creation_date": date,
      "closing_date": date
    }).subscribe({
      next: res => {
        // open dialog
        window.location.reload();
      },
      error: err => console.error(err)
    })
  }

  receiver($event: any) {
    this.retirar($event); 
  }

  retirar(data: any): void{

    const creation_date = new Date(data.creation_date);
    const closing_date = new Date(data.closing_date.slice(0, -14));
    const timeElapsed = closing_date.getTime() - creation_date.getTime();
    const daysElapsed = Math.floor(timeElapsed / (1000 * 3600 * 24));
    
    //eliminar el plazo fijo
    this.http.delete(`/fixeddeposits/${data.id}`).subscribe({
        next: res => {
          // window.location.reload();
        },
        error: err => console.log(err)
      });
    
    //agregar ganancia a la cuenta
    this.http.post(`/accounts/${data.accountId}`, {
      "type": "payment",
      "concept": "Ganancia plazo fijo",
      "amount": data.amount * ((1 + 1.01) ^ daysElapsed)
    }).subscribe({
      next: res => {
        window.location.reload();
      },
      error: err => console.log(err)
    })
  }

}
