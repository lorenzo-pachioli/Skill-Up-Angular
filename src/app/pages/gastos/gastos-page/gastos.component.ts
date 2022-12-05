import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { } from 'stream';

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
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {

  show = 'Cargar';

  @Input() billResponse: IBill | undefined;
  @Output() billResponseChange: EventEmitter<IBill> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  changeShow(component: string): void {
    this.show = component;
  }

}
