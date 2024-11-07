'use client'

import { useGetProductsQuery } from '@/state/api'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import Loader from '@/app/components/Loader'
import { Product } from '@/app/types'

const Market = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const limit = 12

  const { data, isLoading } = useGetProductsQuery({ page, limit })
  const products = useMemo(() => data?.products || [], [data?.products])
  const totalPages = data?.totalPages || 1

  useEffect(() => {
    if (page === 1) {
      setAllProducts([])
    }

    if (products.length) {
      setAllProducts((prevProducts) => {
        const existingIds = new Set(prevProducts.map((p) => p._id))
        const newProducts = products.filter(
          (product) => !existingIds.has(product._id)
        )
        return [...prevProducts, ...newProducts]
      })
    }
  }, [products, page])

  const observer = useRef<IntersectionObserver | null>(null)

  const lastProductRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages && !isLoading) {
          setPage((prev) => prev + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [totalPages, isLoading]
  )

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 h-full">
        {allProducts.map((product, index) => {
          if (index === allProducts.length - 1) {
            return (
              <ProductCard
                ref={lastProductRef}
                product={product}
                key={product._id}
              />
            )
          } else {
            return <ProductCard product={product} key={product._id} />
          }
        })}
      </ul>

      {isLoading && <Loader isLoading={isLoading} />}
    </div>
  )
}

export default Market
