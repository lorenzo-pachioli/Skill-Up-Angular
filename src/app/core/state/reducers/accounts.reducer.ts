import { createReducer, on } from '@ngrx/store';
import { accountCreate, accounts_REQ, accounts_RES } from '../actions/account.actions';
import { AccountsStates } from '../interfaces/state.interface';


export const initialState:AccountsStates = {
  AccountsQueryMade: false,
  selectedAccount: 'ARSAccount',
  ARSAccount: null,
  USDAccount: null
};

export const accountsReducer = createReducer(
  initialState,
  on(accounts_REQ, (state) => (state)),
  on(accounts_RES, (state, { ARSAccount, USDAccount}) => ({ ...state, AccountsQueryMade: true, ARSAccount, USDAccount })),
  
  on(accountCreate, (state) => (state))
);