export interface Transaction{
  accountId: number
  amount: number
  concept: string
  createdAt: string
  date: string
  id: number
  to_account_id: number
  type: 'topup'|'payment'|'Egreso'|'Ingreso'
  updatedAt: string
  ​userId: number
}