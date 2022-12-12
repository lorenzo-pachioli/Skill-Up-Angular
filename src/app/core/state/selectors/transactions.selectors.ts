import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TransactionsState } from '../interfaces/state.interface';

export const selectTransactions = (state: AppState) => state.transactions;
//export const selectTransactions =  createFeatureSelector<AppState,TransactionsState>('transactions');

export const selectAllTransactions = createSelector(
  selectTransactions,
  (state: TransactionsState) => state.allTransactions
);

export const trQueryMade = createSelector(
  selectTransactions,
  (state: TransactionsState) => state.trQueryMade
);

export const tableData = createSelector(
  selectTransactions,
  (state: TransactionsState) => state.tableData
);

export const chartTopPayData = createSelector(
  selectTransactions,
  (state: TransactionsState) => state.chartTopPayData
);

export const chartBalancesData = createSelector(
  selectTransactions,
  (state: TransactionsState) => state.chartBalancesData
);

export const tableDataFilter = createSelector(
  selectTransactions,
  (state: TransactionsState) => state.tableDataFilter
);