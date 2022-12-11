import { createAction, props } from '@ngrx/store';
import { Account } from '../../interfaces/Account';

/*export const allAccounts = createAction('[Account] All accounts', props<{ accountList: Account[] }>());
export const setCurrentAccount = createAction('[Account] Current account', props<{ currentAccount: number }>());*/

export const accounts_REQ = createAction('[Account] Request accounts');
export const accounts_RES = createAction('[Account] Store accounts', props<{ ARSAccount: Account, USDAccount: Account }>() );

export const accountCreate = createAction('[Account] Create account');