import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ew-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  foods = [
    { viewValue: 'a', value: 'a' },
    { viewValue: 'b', value: 'b' },
    { viewValue: 'c', value: 'c' },
  ];
  saldoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogComponent
  ) {
    this.saldoForm = new FormGroup({
      tipoMoneda: new FormControl('ARS', [Validators.required]),
      cantidad: new FormControl('', [Validators.required, Validators.min(0)]),
      concepto: new FormControl('', [Validators.required, Validators.minLength(5)]),
      fecha: new FormControl(''),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    console.log(this.saldoForm)
  }

  close(){
    this.dialogRef.close();
  }
}
