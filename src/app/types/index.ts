//   PRODUCT TYPES
type EraTypes =
  | 'Holocene'
  | 'Late Cretaceous'
  | 'Early Cretaceous'
  | 'Late Triassic'
  | 'Early Jurassic'

export interface Product {
  _id: string
  dinoName: string
  image: string
  rarity: 'Common' | 'Rare' | 'Super Rare' | 'Legendary'
  type: 'Dinosaurs' | 'Flying reptiles' | 'Marine reptiles'
  price: number
  description: string
  era: EraTypes
  family: string
  diet: 'Carnivore' | 'Herbivore' | 'Piscivore'
  attack: number
  defense: number
  appeal: number
  likes: string[]
  dislikes: string[]
}

export interface ProductQuery {
  products: Product[]
  totalPages: number
  currentPage: number
  totalProducts: number
}
// INVENTORY TYPES

export interface Inventory {
  _id: string
  userId: string
  userProducts: Product[]
}

export interface InventoryResponse {
  userInfo: User
  currentPage: number
  items: Product[]
  totalItems: number
  totalPages: number
}

export interface TradersInventories {
  initiator: {
    products: Product[]
    user: UserPreview
  }
  receiver: {
    products: Product[]
    user: UserPreview
  }
}

// TRADE TYPES

export interface Trade {
  _id: string
  initiator: UserPreview
  receiver: UserPreview
  initiatorProducts: Product[]
  receiverProducts: Product[]
  status: 'Pending' | 'Completed' | 'Canceled'
  receiverConfirmed: boolean
  isLoggedUserReceiver: boolean
}

export interface TradeCountByStatus {
  tradeCounts: Array<{
    _id: 'Pending' | 'Completed' | 'Canceled'
    count: number
  }>
  totalTrades: number
}

// USER TYPES

export interface User {
  _id: string
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
  imageUrl?: string
  inventory: Inventory[]
  trades: Trade[]
  money: number
  token: string
}

export interface UserPreview {
  _id: string
  username: string
  imageUrl?: string
}

export interface UsersQuery {
  users: User[]
  totalPages: number
  currentPage: number
  totalUsersByQuery: number
}

export interface NewUser {
  email?: string
  firstName?: string
  lastName?: string
  username?: string
  password: string
}

export interface UpdateUser {
  email: string
  firstName: string
  lastName: string
  password?: string
  img?: File
}

export interface EditUserFormData {
  email: string
  firstName: string
  lastName: string
  password?: string | null
}

export interface UserProfile {
  _id: string
  email: string
  imageUrl?: string
  firstName: string
  lastName: string
  username: string
  trades: string[]
  inventory: Product[]
}

//   OTHER TYPES

export interface OwnerAndProductProps {
  product: Product
  owner: 'initiator' | 'receiver'
}

export interface TransferDoubleClickProps {
  product: Product
  owner: 'initiator' | 'receiver'
  isInTrade: boolean
}

export interface MobileTradeProps {
  initiatorItems: Product[]
  initiatorTradeItems: Product[]
  initiatorInfo: UserPreview | null
  receiverItems: Product[]
  receiverTradeItems: Product[]
  receiverInfo: UserPreview | null
  handlePushToTrade: ({ product, owner }: OwnerAndProductProps) => void
  handleSubmitClick: () => void
}

export interface TraderInventoryModalProps {
  show: boolean
  onClose: () => void
  items: Product[]
  user: UserPreview | null
  owner: 'initiator' | 'receiver'
  handlePushToTrade: ({ product, owner }: OwnerAndProductProps) => void
}
