import { createReducer, on } from '@ngrx/store';
import { allAccounts, setCurrentAccount } from '../actions/account.actions';
import { AccountState } from '../interfaces/state.interface';

export const initialState:AccountState = {
  accountList: [],
  currentAccount: null
};

export const accountsReducer = createReducer(
  initialState,
  on(allAccounts, (state, { accountList }) => ({ ...state, accountList })),
  on(setCurrentAccount, (state, { currentAccount }) => ({ ...state, currentAccount }))
);