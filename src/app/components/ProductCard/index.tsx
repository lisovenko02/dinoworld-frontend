import { Product } from '@/app/types/Product'
import Image from 'next/image'

// LEGENDARY - amber-400
// SUPER RARE - red-500
// RARE - purple-500
// COMMON - blue-500

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { image, dinoName, price, rarity, attack, defense, appeal } = product

  const rarityTextStyle =
    rarity === 'Legendary'
      ? 'text-amber-400'
      : rarity === 'Super Rare'
      ? 'text-rose-600'
      : rarity === 'Rare'
      ? 'text-purple-500'
      : 'text-blue-500'

  return (
    <li className="flex p-5 justify-between bg-gray-100 border-2 rounded">
      {/* RIGHT SIDE */}
      {/* bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 p-4 rounded-md */}
      {/* bg-gradient-to-r from-gray-200 via-blue-50 to-gray-300 p-4 rounded-md */}
      <div className="flex flex-col gap-4 lg:ml-2">
        <div className="bg-gradient-to-r from-gray-200 via-teal-50 to-gray-300 lg:p-4 md:p-0 rounded-md">
          <Image
            src={image}
            alt="name"
            width={200}
            height={200}
            className="custom-img"
          />
        </div>
        <h2 className={`ml-16 text-xl font-bold ${rarityTextStyle}`}>
          {dinoName}
        </h2>
      </div>

      {/* LEFT-SIDE */}
      <div className="flex flex-col justify-between md:ml-2 lg:ml-0">
        <div className="flex flex-col gap-3">
          <p className="text-lg text-gray-700">
            <span className="font-bold">Appeal:</span> {appeal}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-bold">Attack:</span> {attack}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-bold">Defense:</span> {defense}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg ml-1">${price}</p>
          <button className="text-16 rounded-lg border font-semibold text-white border-blue-500 bg-blue-600 p-3">
            Order Now
          </button>
        </div>
      </div>
    </li>
  )
}

export default ProductCard
