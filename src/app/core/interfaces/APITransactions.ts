import { Transaction } from "./Transaction";

export interface APITransactions{
  previousPage: any
  nextPage: any
  data: Array<Transaction>
}