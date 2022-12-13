import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ew-plazo-fijo-proyeccion',
  templateUrl: './plazo-fijo-proyeccion.component.html',
  styleUrls: ['./plazo-fijo-proyeccion.component.scss']
})

export class PlazoFijoProyeccionComponent implements OnInit {

  earningsForm: FormGroup | any;

  amount: number = 0;
  creation_date: string = '';
  closing_date: string = '';

  total: number = 0;
  earnings: number = 0;

  todayDate: Date = new Date();

  @Input() detalle: any;

  constructor(public dialog: MatDialog) {
    this.earningsForm = new FormGroup({
      date: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {}

  ngOnChanges(changes: any) {    
    if(changes.detalle.currentValue) {
      this.amount = parseInt(changes.detalle.currentValue.amount);
      this.creation_date = changes.detalle.currentValue.creation_date;
      if(this.closing_date === '') {
        this.dialog.open(DialogComponent, {
          data: { title: 'Atención', content: 'Para ver la proyeción de las ganancias, seleccione una fecha.' }
        });
      } else {
        this.calculateEarnings();
      }
    }
    
  }

  dateChange($event: any) {
    this.closing_date = new Date($event.value).toLocaleDateString('en-CA');
    if(this.amount === 0) {
      this.dialog.open(DialogComponent, {
        data: { title: 'Atención', content: 'Para ver la proyeción de las ganancias, seleccione una de las inversiones realizadas.' }
      });
    } else {
      this.calculateEarnings();
    }
  }

  calculateEarnings() {
    const creation_date = new Date(this.creation_date);
    const closing_date = new Date(this.closing_date);
    const timeElapsed = closing_date.getTime() - creation_date.getTime();
    const daysElapsed = Math.floor(timeElapsed / (1000 * 3600 * 24));
  
    this.total = this.amount * ((1 + 0.01) ** daysElapsed);
    this.earnings = this.total - this.amount;
  }

}