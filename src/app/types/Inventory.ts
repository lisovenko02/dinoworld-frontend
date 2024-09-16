import { Product } from './Product'

export interface Inventory {
  _id: string
  userId: string
  userProducts: Product[]
}
