import { AppState } from "../app.state";
import { AccountsStates } from "../interfaces/state.interface";
import { createSelector } from '@ngrx/store';

export const selectAccounts = (state: AppState) => state.accounts;
//export const selectTransactions =  createFeatureSelector<AppState,TransactionsState>('transactions');

export const accountsQueryMade = createSelector(
  selectAccounts,
  (state: AccountsStates) => state.AccountsQueryMade
);

export const selectedAccount = createSelector(
  selectAccounts,
  (state: AccountsStates) => state.selectedAccount
);

export const ARSAccount = createSelector(
  selectAccounts,
  (state: AccountsStates) => state.ARSAccount
);

export const USDAccount = createSelector(
  selectAccounts,
  (state: AccountsStates) => state.USDAccount
);