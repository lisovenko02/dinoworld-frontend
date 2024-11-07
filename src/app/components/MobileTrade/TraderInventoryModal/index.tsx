import React from 'react'
import Modal from '../../Modal'
import Image from 'next/image'
import { TraderInventoryModalProps } from '@/app/types'

const TraderInventoryModal = ({
  onClose,
  show,
  items,
  owner,
  user,
  handlePushToTrade,
}: TraderInventoryModalProps) => {
  return (
    <Modal onClose={onClose} show={show}>
      {user && (
        <div className="flex flex-col w-full gap-5">
          <div className="flex gap-3 items-center mb-3">
            <div className="relative w-10 h-10 rounded-md overflow-hidden">
              <Image
                src={user.imageUrl || '/images/dinosaur-bones.png'}
                fill
                alt={user.username}
                className="object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold">{user.username}</h2>
          </div>

          <div className="h-[400px] overflow-y-auto">
            {items.length > 0 ? (
              <ul className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {items.map((product, index) => (
                  <li
                    key={`${product._id}-${index}`}
                    onClick={() => {
                      handlePushToTrade({ product, owner })
                      onClose()
                    }}
                    className="border w-[98px] h-[98px] items-center bg-slate-100 cursor-pointer"
                  >
                    <Image
                      src={product.image}
                      alt={product.dinoName}
                      width={95}
                      height={95}
                      className="custom-inventory-img"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <h2 className="flex justify-center text-2xl font-semibold">
                The inventory is empty
              </h2>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}

export default TraderInventoryModal
