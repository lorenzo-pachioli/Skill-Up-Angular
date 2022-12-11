import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { trTopupPaymentFilterTable } from 'src/app/core/state/actions/transaction.actions';
// import { filter } from 'src/app/core/state/actions/user.actions';

@Component({
  selector: 'ew-movimiento-filter',
  templateUrl: './movimiento-filter.component.html',
  styleUrls: ['./movimiento-filter.component.scss']
})
export class MovimientoFilterComponent implements OnInit {

  filterForm: FormGroup | any;
  @Output() accountStatusChange: EventEmitter<string> = new EventEmitter();

  constructor(private store: Store) {
    this.filterForm = new FormGroup({
      keyword: new FormControl(''),
    })
  }

  ngOnInit(): void {
  }

  actualizarFiltro(event: any) {
    let tableDataFilter: string = event.target.value
    this.store.dispatch(trTopupPaymentFilterTable({tableDataFilter}));
  }

}
