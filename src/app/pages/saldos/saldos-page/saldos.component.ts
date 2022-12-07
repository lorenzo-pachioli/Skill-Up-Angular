import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.scss'],
})
export class SaldosComponent implements OnInit {
  saldosList = [
    { concepto: 'Entrada', cantidad: 4500 },
    { concepto: 'Deposito', cantidad: 2500 },
    { concepto: 'Mercado Pago', cantidad: 1500 },
  ];
  name= 'perro';
  animal= 'dog';
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  ngOnInit(): void {}
}
