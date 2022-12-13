import { createAction, props } from '@ngrx/store';
import { Transaction } from '../../interfaces/Transaction';
import { ChartBalancesData, ChartTopPayData, TableData } from '../interfaces/state.interface';

export const transactions_REQ = createAction('[Transaction] Load transactions');
export const transactions_RES = createAction('[Transaction] All transactions', props<{ allTransactions: Transaction[] }>() );

export const trTopupPaymentData_REQ = createAction('[Transaction] Request Process Topup Payment Data' );
export const trTopupPaymentData_RES = createAction('[Transaction] Response Process Topup Payment Data', props<{ origin: string, tableData: TableData, chartTopPayData: ChartTopPayData }>() );

export const trTopupPaymentFilterChart_REQ = createAction('[Transaction] Request Filter Chart Topup Payment Data', props<{filter:string}>() );
export const trTopupPaymentFilterChart_RES = createAction('[Transaction] Response Filter Chart Topup Payment Data', props<{ chartTopPayData: ChartTopPayData }>() );

export const trTopupPaymentFilterTable = createAction('[Transaction] Request Filter Table Topup Payment Data', props<{tableDataFilter:string}>() );

export const trBalanceData_REQ = createAction('[Transaction] Request Process Balance Data' );
export const trBalanceData_RES = createAction('[Transaction] Response Process Balance Data', props<{ origin: string, chartBalancesData: ChartBalancesData }>() );

export const transactionsClean = createAction('[Transaction] Clean Transactions');
//export const transactionsDate = createAction('[Transaction] Date', props<{ timeSpan: [number,number] }>());  