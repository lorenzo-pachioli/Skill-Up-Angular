import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from 'src/app/core/interfaces/Account';
import { Investment } from 'src/app/core/interfaces/Investment';
import { HttpService } from 'src/app/core/services/http.service';
import { AppState } from 'src/app/core/state/app.state';
import { ARSAccount } from 'src/app/core/state/selectors/accounts.selectors';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'ew-plazo-fijo',
  templateUrl: './plazo-fijo.component.html',
  styleUrls: ['./plazo-fijo.component.scss']
})
export class PlazoFijoComponent implements OnInit {

  fixedDepositForm: FormGroup | any;

  @Input() retirar: any;
  @Output() detalleInversion: EventEmitter<any> = new EventEmitter();

  // variables
  saldo: number = 0;
  userId!: number;
  accounts!: Array<Account>;
  accountId!: number;
  investments!: Array<Investment>;
  selectedAccountId!: number;
  selectedAccount!: Account;

  // cuenta en pesos en store
  arsAccount$: Observable<any> = new Observable();
  ars!: Account;

  loading: boolean = true;

  // columnas para la tabla
  displayedColumns=["creation_date", "amount", "acciones"];
  columnsHeader=["Fecha de creación", "Monto ($)", "Acciones"];

  constructor(private http: HttpService, private store: Store<AppState>, public dialog: MatDialog) {
    this.fixedDepositForm = new FormGroup({
      monto: new FormControl('',  [Validators.required, Validators.pattern("^[0-9]{1,9}([,.][0-9]{1,2})?$"), Validators.min(0.01)]),
    })

    this.arsAccount$ = this.store.select(ARSAccount);
    this.arsAccount$.subscribe(value => this.ars = value);
  }

  ngOnInit(): void {    

    // traer cuentas en pesos del usuario
    this.http.get('/accounts/me').subscribe({
      next: (res: any) => {
        this.accounts = res;
        // valida que el monto a congelar sea menor al saldo en cuenta
        if(this.accounts.length !== 0) {
          this.fixedDepositForm.get('monto').setValidators(
            [Validators.required,
              Validators.pattern("^[0-9]{1,9}([,.][0-9]{1,2})?$"),
              Validators.min(0.01),
              Validators.max(this.saldo)]);
          this.fixedDepositForm.get('monto').updateValueAndValidity();
        }

        setTimeout(() => {
          this.elegirCuenta(this.ars.id);
        }, 1500);
      }
    })

    // traer listado de inversiones
    this.http.get('/fixeddeposits').subscribe({
      next: (res: any) => {        
        this.investments = res.data;
        // formato de fecha
        this.investments.forEach((i: any) => {
          i.creation_date = i.creation_date.slice(0, -14);
          i.actions = '';
        });

        this.loading = false;
      }
    })
  }

  elegirCuenta(accountId: any){
    // setea los datos de la cuenta elegida
    if (this.accounts.length > 0){
      this.selectedAccount = this.accounts.find(a => a.id === accountId)!;
      this.saldo = this.selectedAccount.money;
      
      this.fixedDepositForm.get('monto').setValidators(
        [Validators.required,
          Validators.pattern("^[0-9]{1,9}([,.][0-9]{1,2})?$"),
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
        // this.dialog.open(DialogComponent, {
        //   width: '400px',
        //   data: {
        //     title: 'Inversión creada',
        //     content: 'Ha creado la inversión correctamente'
        //   }
        // })
      }
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
        // refresca la pagina
        window.location.reload();
      }
    })
  }

  receiverRetirar(data: any): void{

    // cuanto tiempo duró la inversión
    const creation_date = new Date(data.creation_date);
    const closing_date = new Date(data.closing_date.slice(0, -14));
    const timeElapsed = closing_date.getTime() - creation_date.getTime();
    const daysElapsed = Math.floor(timeElapsed / (1000 * 3600 * 24));
    
    //eliminar el plazo fijo
    this.http.delete(`/fixeddeposits/${data.id}`).subscribe({
        next: res => {
          // this.dialog.open(DialogComponent, {
          //   width: '400px',
          //   data: {
          //     title: 'Inversión retirada',
          //     content: 'Ha retirado su inversión correctamente'
          //   }
          // })
        }
      });
    
    //agregar ganancia a la cuenta
    this.http.post(`/accounts/${data.accountId}`, {
      "type": "payment",
      "concept": "Ganancia plazo fijo",
      "amount": data.amount * ((1 + 0.01) ** daysElapsed)
    }).subscribe({
      next: res => {
        // refresca
        window.location.reload();
      }
    })
  }

  // pasa la data de la inversion elegida para ver la proyeccion
  receiverDetalle(data: any): void{
    this.detalleInversion.emit(data);
  }

}
