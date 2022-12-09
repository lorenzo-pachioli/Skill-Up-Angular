import { createAction, props } from '@ngrx/store';
import { Transaction } from '../../interfaces/Transaction';
import { ChartBalancesData, ChartTopPayData, TableData } from '../interfaces/state.interface';

export const transactions_REQ = createAction('[Transaction] Load transactions');
export const transactions_RES = createAction('[Transaction] All transactions', props<{ allTransactions: Transaction[] }>() );

export const trTopupPaymentData_REQ = createAction('[Transaction] Request Process Topup Payment Data' );
export const trTopupPaymentData_RES = createAction('[Transaction] Response Process Topup Payment Data', props<{ tableData: TableData, chartTopPayData: ChartTopPayData }>() );

export const trTopupPaymentFilter_REQ = createAction('[Transaction] Request Filter Topup Payment Data', props<{filter:string}>() );
export const trTopupPaymentFilter_RES = createAction('[Transaction] Response Filter Topup Payment Data', props<{ tableData: TableData, chartTopPayData: ChartTopPayData }>() );

export const trBalanceData_REQ = createAction('[Transaction] Request Process Balance Data' );
export const trBalanceData_RES = createAction('[Transaction] Response Process Balance Data', props<{ chartBalancesData: ChartBalancesData }>() );
//export const transactionsDate = createAction('[Transaction] Date', props<{ timeSpan: [number,number] }>());  