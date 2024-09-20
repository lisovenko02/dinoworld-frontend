import { Product } from './Product'

export interface Inventory {
  _id: string
  userId: string
  userProducts: Product[]
}

export interface InventoryResponse {
  currentPage: number
  items: Product[]
  totalItems: number
  totalPages: number
}
