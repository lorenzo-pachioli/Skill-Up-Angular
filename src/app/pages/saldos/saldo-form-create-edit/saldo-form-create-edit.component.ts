import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ew-saldo-form-create-edit',
  templateUrl: './saldo-form-create-edit.component.html',
  styleUrls: ['./saldo-form-create-edit.component.scss'],
})
export class SaldoFormCreateEditComponent implements OnInit {
  formSaldosEdit!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formSaldosEdit = this.formBuilder.group({
      saldo: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  editar() {}
}
