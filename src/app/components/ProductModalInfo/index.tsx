import { Product } from '@/app/types'
import Image from 'next/image'
import React, { useState } from 'react'

interface ProductModalInfoProps {
  product: Product
}

const ProductModalInfo = ({ product }: ProductModalInfoProps) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const rarityTextStyle =
    product.rarity === 'Legendary'
      ? 'text-amber-400'
      : product.rarity === 'Super Rare'
      ? 'text-rose-600'
      : product.rarity === 'Rare'
      ? 'text-purple-500'
      : 'text-blue-500'

  const dietImg =
    product.diet === 'Carnivore'
      ? 'https://static.wikia.nocookie.net/jurassicworld-evolution/images/1/1f/Carnivore_icon.svg/revision/latest?cb=20210829102833'
      : product.diet === 'Piscivore'
      ? 'https://static.wikia.nocookie.net/jurassicworld-evolution/images/6/65/Piscivore_icon.svg/revision/latest?cb=20210829102915'
      : 'https://static.wikia.nocookie.net/jurassicworld-evolution/images/4/44/Herbivore_icon.svg/revision/latest?cb=20210829102724'

  return (
    <div
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Image
        src={product.image}
        alt={product.dinoName}
        width={95}
        height={95}
        className="cursor-pointer rounded-lg custom-inventory-img"
      />

      {showTooltip && (
        <div className="absolute flex flex-col left-10 -top-20 p-4 border-2 border-slate-600 rounded-lg shadow-xl w-[350px] z-50 bg-gradient-to-br from-slate-50 to-slate-200 transition-transform duration-300 transform -translate-y-2">
          <div className="flex justify-center mb-2">
            <Image
              src={product.image}
              alt={product.dinoName}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
          <hr />

          <div className="flex flex-col items-center gap-2">
            <h2 className="font-bold text-2xl">{product.dinoName}</h2>
            <p className={`${rarityTextStyle} font-semibold text-xl`}>
              {product.rarity}
            </p>
          </div>
          <hr />
          <p className="text-lg mt-2">
            <span className="font-semibold">Era</span>: {product.era}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Family</span>: {product.family}
          </p>
          <p className="text-lg flex gap-1">
            <span className="font-semibold">Diet</span>:
            <Image
              src={dietImg}
              width={15}
              height={15}
              alt={product.dinoName}
              className="mr-1"
            />
            {product.diet}
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductModalInfo
