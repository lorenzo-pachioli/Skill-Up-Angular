import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBill } from 'src/app/core/interfaces/Bills';

@Component({
  selector: 'ew-bill-response',
  templateUrl: './bill-response.component.html',
  styleUrls: ['./bill-response.component.scss']
})
export class BillResponseComponent implements OnInit {

  @Input() billResponse: IBill | undefined;
  @Output() billResponseChange: EventEmitter<IBill> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  setDate(date: any): string {

    const toDate = new Date(date);
    const day = toDate.getDate();
    const month = toDate.getMonth() + 1;
    const year = toDate.getFullYear();

    return `${day}/${month}/${year}`
  }
}
