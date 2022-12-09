import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './reducers/user.reducer';
import { User } from './interfaces/state.interface';
import { accountsReducer } from './reducers/accounts.reducer';
import { transactionsReducer } from './reducers/transactions.reducer';
import { TransactionsEffects } from './effects/transactions.effects';

export interface AppState {
  user: any;
  accounts: any;
  transactions: any;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  user: userReducer, //es el mismo nombre que se le dio en el app.module.ts
  accounts: accountsReducer,
  transactions: transactionsReducer
};

export const ROOT_EFFECTS = [TransactionsEffects]
