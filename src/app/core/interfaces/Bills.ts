export interface IBill {
  id: number;
  amount: number;
  concept: string;
  date: string;
  createdAt: string;
  type: string;
  accountId: number;
  userId: number;
  to_account_id: number;
}