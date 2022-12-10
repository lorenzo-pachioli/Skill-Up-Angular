import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.scss'],
})
export class SaldosComponent implements OnInit {
  saldos$!: Observable<any>;
  userId!: number;
  cuentas: number[];

  constructor(public dialog: MatDialog, private httpService: HttpService) {
    this.cuentas = [];
  }

  ngOnInit(): void {
    this.getInfoUser();
    this.getSaldos();
  }
  getInfoUser() {
    this.httpService.get('/accounts/me').subscribe((x: any) => {
      console.log(x);
      x.forEach((e: any) => {
        this.cuentas.push(e.id);
        this.userId = e.userId;
      });
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
        cantidad: 0,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.httpService
          .post('/accounts/' + result.cuenta, {
            type: 'topup',
            concept: result.concepto,
            amount: result.cantidad,
          })
          .subscribe((x) => {
            console.log('Añadido');
            this.getSaldos();
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
      if (result !== undefined) {
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
          .subscribe((x) => {
            console.log('Editado');
            this.getSaldos();
          });
      }
    });
  }
}
