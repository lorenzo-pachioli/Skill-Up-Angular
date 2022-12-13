import { IUser } from "./User";

export interface APIUser {
  previousPage: string
  nextPage: string
  data:IUser[]
}