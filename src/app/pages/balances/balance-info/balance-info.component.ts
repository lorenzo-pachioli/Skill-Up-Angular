import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBalance } from 'src/app/core/interfaces/Balance';

@Component({
  selector: 'ew-balance-info',
  templateUrl: './balance-info.component.html',
  styleUrls: ['./balance-info.component.scss']
})
export class BalanceInfoComponent implements OnInit {

  @Input() accountStatus!: IBalance | undefined;

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
