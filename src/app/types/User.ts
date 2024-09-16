import { Inventory } from './Inventory'
import { Trade } from './Trade'

export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
  inventory?: Inventory[]
  trades?: Trade[]
}
