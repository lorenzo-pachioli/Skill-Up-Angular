import { Transaction } from "./Transaction";

export interface Transactions{
  previousPage: any
  nextPage: any
  data: Array<Transaction>
}