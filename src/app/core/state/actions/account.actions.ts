import { createAction, props } from '@ngrx/store';
import { Account } from '../../interfaces/Account';

export const accounts_REQ = createAction('[Account] Request accounts');
export const accounts_RES = createAction('[Account] Store accounts', props<{ ARSAccount: Account, USDAccount: Account }>() );

export const accountCreate = createAction('[Account] Create account');

export const accountToggle = createAction('[Account] Toggle account', props<{ selectedAccount: 'USDAccount'|'ARSAccount' }>() );

export const accountsClean = createAction('[Account] Clean accounts' );