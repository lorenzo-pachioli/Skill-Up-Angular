import { createAction, props } from '@ngrx/store';
import { Account } from '../../interfaces/Account';

export const allAccounts = createAction('[Account] All accounts', props<{ accountList: Account[] }>());
export const setCurrentAccount = createAction('[Account] Current account', props<{ currentAccount: number }>());