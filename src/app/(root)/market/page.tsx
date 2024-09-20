'use client'

import { useGetProductsQuery } from '@/state/api'
import React from 'react'
import ProductCard from '../../components/ProductCard'

const Market = () => {
  const { data: products } = useGetProductsQuery()
  return (
    <div>
      {/* PRODUCTS LIST */}
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 h-full">
        {products &&
          products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </ul>
    </div>
  )
}

export default Market

{
  /* <div>
            <Image
              src="https://s3-inventory--management.s3.eu-north-1.amazonaws.com/profile.jpg"
              alt="help"
              width={250}
              height={250}
            />
          </div>
          <p>Attack</p>
        </div>
        <div>
          <div>
            <h2>Name</h2>
            <p className="text-yellow-300 ">Legendary</p>
            <p>Type</p>
            <p>Family</p>
          </div>
          <div>
            <p>Price: 10$</p>
            <button>Buy</button>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>
            <Image
              src="https://s3-inventory--management.s3.eu-north-1.amazonaws.com/profile.jpg"
              alt="help"
              width={250}
              height={250}
            />
          </div>
          <p>Attack</p>
        </div>
        <div>
          <div>
            <h2>Name</h2>
            <p>Legendary</p>
            <p>Type</p>
            <p>Family</p>
          </div>
          <div>
            <p>Price: 10$</p>
            <button>Buy</button>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>
            <Image
              src="https://s3-inventory--management.s3.eu-north-1.amazonaws.com/profile.jpg"
              alt="help"
              width={250}
              height={250}
            />
          </div>
          <p>Attack</p>
        </div>
        <div>
          <div>
            <h2>Name</h2>
            <p>Legendary</p>
            <p>Type</p>
            <p>Family</p>
          </div>
          <div>
            <p>Price: 10$</p>
            <button>Buy</button>
          </div> */
}
