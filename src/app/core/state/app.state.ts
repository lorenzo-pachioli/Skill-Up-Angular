import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import { User } from './interfaces/state.interface';
import { accountsReducer } from './reducers/accounts.reducer';
import { transactionsReducer } from './reducers/transactions.reducer';
import { TransactionsEffects } from './effects/transactions.effects';
import { authReducer } from './auth/auth.reducer';
import { NgModule } from '@angular/core';

export const FEATURE_KEY = 'sharedState';
export interface AppState {
  user: any;
  accounts: any;
  transactions: any;
}

export const reducers: ActionReducerMap<AppState> = {
  user: authReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];

export const ROOT_EFFECTS = [TransactionsEffects];

@NgModule({
  imports: [StoreModule.forFeature(FEATURE_KEY, reducers, { metaReducers })],
})
export class SharedStateModule {}

export const selectSharedState = createFeatureSelector<AppState>(FEATURE_KEY);
