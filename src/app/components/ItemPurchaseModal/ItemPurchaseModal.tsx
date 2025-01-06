import React from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { ItemPurchaseModalProps } from '@/app/types'
import Image from 'next/image'
import Modal from '../Modal'

const ItemPurchaseModal = ({
  onClose,
  show,
  product,
  handleSubmitProduct,
  isLoading,
}: ItemPurchaseModalProps) => {
  const { _id, dinoName, rarity, price, era, image, type } = product

  const rarityTextStyle =
    rarity === 'Legendary'
      ? 'text-amber-400'
      : rarity === 'Super Rare'
      ? 'text-rose-600'
      : rarity === 'Rare'
      ? 'text-purple-500'
      : 'text-blue-500'

  return (
    <Modal onClose={onClose} show={show}>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-zinc-700 dark:text-zinc-200"
        aria-label="Close modal"
      >
        <FaWindowClose size={24} />
      </button>

      <div className="p-6">
        <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-200 mb-4">
          Are you sure you want to purchase this item?
        </h2>

        <div className="flex items-center mb-4">
          <Image
            src={image}
            alt={dinoName}
            width={256}
            height={256}
            className="w-32 h-32 object-cover rounded-md"
          />
          <div className="ml-4">
            <p className={`text-lg font-bold ${rarityTextStyle}`}>{dinoName}</p>
            <p className="text-gray-700 dark:text-gray-600 font-semibold">
              Type: {type}
            </p>
            <p className="text-gray-700 dark:text-gray-600 font-semibold">
              Price: ${price.toLocaleString()}
            </p>
          </div>
        </div>

        <p className="mb-4 text-gray-700 dark:text-gray-600">
          This dinosaur is a highly desirable asset for your collection. It
          originates from the {era} period.
        </p>

        <div className="flex justify-end">
          <button
            disabled={isLoading}
            onClick={() => handleSubmitProduct({ productId: _id, dinoName })}
            className="px-4 py-2 mr-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ItemPurchaseModal
