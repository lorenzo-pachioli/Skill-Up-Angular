import { createFeatureSelector, createSelector } from '@ngrx/store'; //TODO <----
import { AppState } from '../app.state';
import { TransactionsState } from '../interfaces/state.interface';

//TODO: Es el selector que tiene relacion con la propiedad "items"

export const selectTransactions = (state: AppState) => state.transactions;//TODO: PADRE
//export const selectTransactions =  createFeatureSelector<AppState,TransactionsState>('transactions');

export const selectAllTransactions = createSelector(
  selectTransactions,
  (state: TransactionsState) => state.allTransactions //TODO: HIJO
);

export const queryMade = createSelector(
  selectTransactions,
  (state: TransactionsState) => state.queryMade //TODO: HIJO
);

export const tableData = createSelector(
  selectTransactions,
  (state: TransactionsState) => state.tableData //TODO: HIJO
);

export const chartTopPayData = createSelector(
  selectTransactions,
  (state: TransactionsState) => state.chartTopPayData//TODO: HIJO
);

export const chartBalancesData = createSelector(
  selectTransactions,
  (state: TransactionsState) => state.chartBalancesData//TODO: HIJO
);