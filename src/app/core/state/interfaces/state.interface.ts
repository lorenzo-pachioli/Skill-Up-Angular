import { Account } from "../../interfaces/Account";
import { Transaction } from "../../interfaces/Transaction";


export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  point: number;
  roleId: number;
  updatedAt: string;
  createdAt: string;
  token: string;
}

export interface AccountsStates {
  AccountsQueryMade: boolean
  selectedAccount: string
  ARSAccount: Account|null
  USDAccount: Account|null
}

export interface TransactionsState {
  trQueryMade: boolean
  origin: string
  allTransactions: Transaction[]
  timeSpan: 'CurrentMonth'|'LastMonth'|'Last30Days'
  tableData: TableData|null
  tableDataFilter: string
  chartTopPayData: ChartTopPayData|null
  chartBalancesData: ChartBalancesData|null
}
export interface TableData  {
  title: string
  columns: string[]
  list: TableRow[]|null
}
export interface TableRow {
  cuenta: number
  fecha: string
  tipo: 'Ingreso'|'Egreso'|null
  concepto: string
  monto: number
}

export interface ChartTopPayData  {
  chart: string
  ingresos: number[]
  egresos: number[]
  fechas: string[]
}

export interface ChartBalancesData {
  chart: string
  balanceARS: number[]
  balanceUSD: number[]
  fechas: string[]
}