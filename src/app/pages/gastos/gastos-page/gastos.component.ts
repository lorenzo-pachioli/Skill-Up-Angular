import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBill } from 'src/app/core/interfaces/Bills';
@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {


  @Input() billResponse: IBill | undefined;
  @Output() billResponseChange: EventEmitter<IBill> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  resetBillResponse(): void {
    this.billResponse = undefined;
    this.billResponseChange.emit();
  }

}
