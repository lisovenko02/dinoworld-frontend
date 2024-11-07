import {
  Inventory,
  InventoryResponse,
  NewUser,
  Product,
  ProductQuery,
  Trade,
  TradeCountByStatus,
  TradersInventories,
  User,
  UserProfile,
  UsersQuery,
} from '@/app/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  reducerPath: 'api',
  tagTypes: [
    'AllProducts',
    'Users',
    'UserInventory',
    'TradersInventories',
    'Trades',
    'TradeCount',
    'User',
    'Product',
  ],
  endpoints: (build) => ({
    signUp: build.mutation<User, NewUser>({
      query: (newUser) => ({
        url: '/user/sign-up',
        method: 'POST',
        body: newUser,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          localStorage.setItem('token', data.token)
        } catch (error) {
          console.error('Failed to sign in:', error)
        }
      },
    }),
    signIn: build.mutation<User, NewUser>({
      query: (User) => ({
        url: '/user/sign-in',
        method: 'POST',
        body: User,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          localStorage.setItem('token', data.token)
        } catch (error) {
          console.error('Failed to sign in:', error)
        }
      },
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/user/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled
          localStorage.removeItem('token')
        } catch (error) {
          console.error('Logout failed:', error)
        }
      },
    }),
    editProfile: build.mutation<User, FormData>({
      query: (formData) => ({
        url: '/user/update',
        method: 'POST',
        body: formData,
      }),
    }),
    depositToAcc: build.mutation<string, { deposit: number }>({
      query: (deposit) => ({
        url: '/user/deposit',
        method: 'POST',
        body: deposit,
      }),
    }),
    addProduct: build.mutation<Inventory, string>({
      query: (productId) => ({
        url: '/inventory',
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['User'],
    }),
    requestTrade: build.mutation<
      Trade,
      {
        receiverId: string
        receiverProducts: string[]
        initiatorProducts: string[]
      }
    >({
      query: ({ receiverId, receiverProducts, initiatorProducts }) => ({
        url: `/trade/request/${receiverId}`,
        method: 'POST',
        body: {
          receiverProducts,
          initiatorProducts,
        },
      }),
    }),
    confirmedTrade: build.mutation<string, { tradeId: string; status: string }>(
      {
        query: ({ tradeId, status }) => ({
          url: '/trade',
          method: 'POST',
          body: {
            tradeId: tradeId,
            status: status,
          },
        }),
      }
    ),
    getTradeCountByStatus: build.query<TradeCountByStatus, string | void>({
      query: () => '/trade/countByStatus',
      providesTags: ['TradeCount'],
    }),
    getCurrentUser: build.query<User, string | void>({
      query: () => '/user/isLoggedIn',
      providesTags: ['User'],
    }),
    getUserProfile: build.query<UserProfile, string>({
      query: (userId) => `/user/profile/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
    }),
    getUsers: build.query<
      UsersQuery,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search = '' }) => {
        const searchQuery = search
          ? `&search=${encodeURIComponent(search)}`
          : ''

        return `/user?page=${page}&limit=${limit}${searchQuery}`
      },
      providesTags: ['Users'],
    }),
    getProducts: build.query<ProductQuery, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 12 }) =>
        `/products?page=${page}&limit=${limit}`,
      providesTags: ['AllProducts'],
    }),
    getProduct: build.query<Product, string>({
      query: (productId) => `/products/${productId}`,
      providesTags: ['Product'],
    }),
    getInventory: build.query<
      InventoryResponse,
      { userId: string; page?: number }
    >({
      query: ({ userId, page = 1 }) => `/inventory/${userId}?page=${page}`,
      providesTags: ['UserInventory'],
    }),
    getTradersInventories: build.query<
      TradersInventories,
      { receiverId: string }
    >({
      query: ({ receiverId }) => `/inventory/traders/${receiverId}`,
      providesTags: ['TradersInventories'],
    }),
    getUserTrades: build.query<Trade[], string | void>({
      query: () => '/trade',
      providesTags: ['Trades'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetUsersQuery,
  useGetCurrentUserQuery,
  useGetUserProfileQuery,
  useGetInventoryQuery,
  useGetTradeCountByStatusQuery,
  useSignUpMutation,
  useSignInMutation,
  useLogoutMutation,
  useEditProfileMutation,
  useAddProductMutation,
  useGetUserTradesQuery,
  useConfirmedTradeMutation,
  useGetTradersInventoriesQuery,
  useRequestTradeMutation,
  useDepositToAccMutation,
} = api
