import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'ew-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  saldoForm: FormGroup;

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cuentas: any[];
      titulo: string;
      editar: boolean;
      concepto: string;
      cantidad: number;
    }
  ) {
    this.saldoForm = new FormGroup({
      cantidad: new FormControl(this.data.cantidad, [Validators.required, Validators.min(0)]),
      concepto: new FormControl(this.data.concepto, [Validators.required, Validators.minLength(3)]),
      cuenta: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.data.editar) {
      this.saldoForm.controls['cantidad'].disable();
      this.saldoForm.controls['cuenta'].disable();
          }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close(this.saldoForm.getRawValue());
  }
  ngOnDestroy(): void {}
}
