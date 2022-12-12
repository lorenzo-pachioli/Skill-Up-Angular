import { AppState } from "../app.state";
import { AccountsStates } from "../interfaces/state.interface";
import { createSelector } from '@ngrx/store';
import { IUser } from "../../interfaces/User";

export const selectUser = (state: AppState) => state.user;
//export const selectTransactions =  createFeatureSelector<AppState,TransactionsState>('transactions');

export const selectedUser = createSelector(
  selectUser,
  (state: IUser) => state
);
