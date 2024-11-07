import Image from 'next/image'
import React from 'react'
import { Product, UserPreview } from '@/app/types'
import ProductModalInfo from '../ProductModalInfo'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'

const ProductList = ({
  products,
  trader,
}: {
  products: Product[]
  trader: UserPreview
}) => {
  return (
    <div className="w-full p-4">
      <div className="flex gap-3 items-end mb-4 cursor-pointer">
        <Link
          href={`/users/${trader._id}`}
          className="relative w-10 h-10 rounded-md overflow-hidden"
        >
          <Image
            src={trader.imageUrl || '/images/dinosaur-bones.png'}
            fill
            alt={trader.username}
            className="object-cover"
          />
        </Link>
        <Link href={`/users/${trader._id}`}>
          <p className="text-lg font-semibold">{trader.username}</p>
        </Link>
      </div>
      {products.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
          {products.map((product: Product) => (
            <li
              key={`${product._id}-${uuidv4()}`}
              className="flex justify-center items-center border p-2 bg-slate-200"
            >
              <ProductModalInfo product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-10" />
      )}
    </div>
  )
}

export default ProductList
