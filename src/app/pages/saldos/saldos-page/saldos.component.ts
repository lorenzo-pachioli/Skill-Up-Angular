import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { AppState } from 'src/app/core/state/app.state';
import { ARSAccount, USDAccount } from 'src/app/core/state/selectors/accounts.selectors';
import { selectAllTransactions } from 'src/app/core/state/selectors/transactions.selectors';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'ew-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.scss'],
})
export class SaldosComponent implements OnInit {
  saldos$!: Observable<any>;
  userId!: number;
  cuentas: any[] = []
  cuentaARS$: Observable<any> = new Observable();
  cuentaUSD$: Observable<any> = new Observable();
  saldosStore$: Observable<any> = new Observable();

  constructor(
    public dialog: MatDialog,
    private httpService: HttpService,
    private store: Store<AppState>,
    private snack: MatSnackBar
  ) {
    this.cuentaARS$ = this.store.select(ARSAccount);
    this.cuentaUSD$ = this.store.select(USDAccount);
    this.saldosStore$ = this.store.select(selectAllTransactions);
  }

  ngOnInit(): void {
    this.getInfoUser();
    this.getSaldos();
  }

  getInfoUser() {
    this.cuentaARS$.subscribe((data) => {
      if( data){
          this.cuentas.push({
        cuenta: 'ARS',
        id: data.id,
      });
      this.userId = data.userId;
      }

    });
    this.cuentaUSD$.subscribe((data) => {
      if(data){
          this.cuentas.push({
        cuenta: 'USD',
        id: data.id,
      });
      }
    });
  }

  getSaldos() {
    this.saldos$ = this.httpService.get('/transactions').pipe(
      map((x: any) => {
        const res = x.data.filter((e: any) => {
          if (e.type === 'topup') {
            return e;
          }
        });
        return res;
      })
    );
  }

  addSaldo(): void {

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        cuentas: this.cuentas,
        titulo: 'Añadir saldo',
        editar: false,
        concepto: '',
        cantidad: null,
      },
    });

   dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.httpService
          .post('/accounts/' + result.cuenta, {
            type: 'topup',
            concept: result.concepto,
            amount: result.cantidad,
          })
          .subscribe(() => {
            this.getSaldos();
            this.snack.open('Creado con éxito', undefined, {
              duration: 900,
            });
          });
      }
    });
  }

  editSaldo(cantidad: any, concepto: any, id: any, date: any, cuenta: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        cuentas: this.cuentas,
        titulo: 'Editar saldo',
        editar: true,
        concepto: concepto,
        cantidad: cantidad,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.httpService
          .put('/transactions/' + id, {
            amount: result.cantidad,
            concept: result.concepto,
            date: date,
            type: 'topup',
            accountId: cuenta,
            userId: this.userId,
            to_account_id: cuenta,
          })
          .subscribe(() => {
            this.getSaldos();
            this.snack.open('Editado correctamente', '', {
              duration: 900,
            });
          });
      }
    });
  }
}
