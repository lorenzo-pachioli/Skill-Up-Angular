import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface IBill {
  id: number;
  amount: number;
  concept: string;
  date: string;
  createdAt: string;
  type: string;
  accountId: number;
  userId: number;
  to_account_id: number;
}

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

}
