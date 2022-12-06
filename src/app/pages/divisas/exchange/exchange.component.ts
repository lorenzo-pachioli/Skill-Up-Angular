import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidatorFn, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ExchangeService } from 'src/app/core/services/exchange.service';
import { HttpService } from 'src/app/core/services/http.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'ew-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

form: FormGroup = new FormGroup({});
importe = new FormControl
resultado = new FormControl



Monedas:any = [
 {value: '1', viewValue: 'ARS a USD'},
  {value: '2', viewValue: 'USD a ARS'},
];

  constructor(
    private http: HttpService,
    public fb:FormBuilder,
    public exchangeService:ExchangeService

  ) { this.form = fb.group({
    moneda: [''], 
  })
}
   
  ngOnInit(): void {
  }

getf(){

  return this.form.controls;
}

submit(){

  console.log(this.form.value);

}
}