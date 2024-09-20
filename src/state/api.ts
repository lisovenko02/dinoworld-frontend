import { InventoryResponse } from '@/app/types/Inventory'
import { Product } from '@/app/types/Product'
import { User } from '@/app/types/User'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: 'api',
  tagTypes: ['AllProducts', 'AllUsers', 'UserInventory'],
  endpoints: (build) => ({
    getProducts: build.query<Product[], string | void>({
      query: () => '/products',
      providesTags: ['AllProducts'],
    }),
    getUsers: build.query<User[], string | void>({
      query: () => '/user',
      providesTags: ['AllUsers'],
    }),
    getInventory: build.query<
      InventoryResponse,
      { userId: string; page?: number }
    >({
      query: ({ userId, page = 1 }) => `/inventory/${userId}?page=${page}`,
      providesTags: ['UserInventory'],
    }),
  }),
})

export const { useGetProductsQuery, useGetUsersQuery, useGetInventoryQuery } =
  api
