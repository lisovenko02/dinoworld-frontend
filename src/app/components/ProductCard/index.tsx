import { Product } from '@/app/types'
import { useAddProductMutation } from '@/state/api'
import Image from 'next/image'
import Link from 'next/link'
import { forwardRef } from 'react'
import toast from 'react-hot-toast'
import { showErrorToast } from '../../../../lib/utils'

type ProductCardProps = {
  product: Product
}

const ProductCard = forwardRef<HTMLLIElement, ProductCardProps>(
  ({ product }, ref) => {
    const [addProduct, { isLoading }] = useAddProductMutation()

    const { _id, image, dinoName, price, rarity, attack, defense, appeal } =
      product

    const rarityTextStyle =
      rarity === 'Legendary'
        ? 'text-amber-400'
        : rarity === 'Super Rare'
        ? 'text-rose-600'
        : rarity === 'Rare'
        ? 'text-purple-500'
        : 'text-blue-500'

    const handleSubmitProduct = async ({
      productId,
      dinoName,
    }: {
      productId: string
      dinoName: string
    }) => {
      try {
        await addProduct(productId).unwrap()
        toast.success(`You have successfully purchased a ${dinoName}`)
      } catch (error) {
        showErrorToast(error)
      }
    }

    return (
      <li
        ref={ref}
        className="flex flex-col bg-white dark:bg-slate-200 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
      >
        <div className="relative w-full">
          <div className="flex justify-center items-center h-64 w-full mt-6">
            <Image
              src={image}
              alt={dinoName}
              layout="intrinsic"
              width={256}
              height={200}
              style={{ width: 'auto', height: 'auto' }}
              className="custom-img"
            />
          </div>

          <div className="absolute top-4 left-4">
            <Link
              href={`/market/${_id}`}
              className="bg-slate-300 hover:bg-slate-400 font-semibold py-1 px-3 rounded transition duration-200 dark:bg-gray-500 dark:hover:bg-gray-400 text-sm"
            >
              View Details
            </Link>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between text-lg items-end">
            <h2
              className={`text-2xl font-bold text-zinc-700 dark:text-zinc-200`}
            >
              {dinoName}
            </h2>
            <span className="font-bold text-green-600">
              ${price.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className={`text-xl font-semibold ${rarityTextStyle} mb-2`}>
              {rarity}
            </h3>
            <p className="text-gray-700 dark:text-gray-600">
              <span className="font-semibold">Appeal:</span> {appeal}
            </p>
            <p className="text-gray-700 dark:text-gray-600">
              <span className="font-semibold">Attack:</span> {attack}
            </p>
            <p className="text-gray-700 dark:text-gray-600">
              <span className="font-semibold">Defense:</span> {defense}
            </p>
          </div>
          <button
            className="mt-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-400"
            disabled={isLoading}
            onClick={() => handleSubmitProduct({ productId: _id, dinoName })}
          >
            {isLoading ? 'Processing...' : 'Order Now'}
          </button>
        </div>
      </li>
    )
  }
)

ProductCard.displayName = 'ProductCard'

export default ProductCard
