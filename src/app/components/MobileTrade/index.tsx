import Image from 'next/image'
import React, { useState } from 'react'
import { PiPlusBold } from 'react-icons/pi'
import TraderInventoryModal from './TraderInventoryModal'
import { MobileTradeProps } from '@/app/types'
import Link from 'next/link'

const MobileTrade = ({
  initiatorItems,
  initiatorTradeItems,
  initiatorInfo,
  receiverItems,
  receiverTradeItems,
  receiverInfo,
  handlePushToTrade,
  handleSubmitClick,
}: MobileTradeProps) => {
  const [showModal, setShowModal] = useState(false)
  console.log('initiatorInfo', initiatorInfo)
  console.log('receiverInfo', receiverInfo)
  const [whosInventory, setWhosInventory] = useState<
    'initiator' | 'receiver' | null
  >(null)

  const handleAddItemClick = (owner: 'initiator' | 'receiver') => {
    setWhosInventory(owner)
    setShowModal(!showModal)
  }
  console.log('initiatorInfo', initiatorInfo)
  const currentInventory =
    whosInventory === 'initiator' ? initiatorItems : receiverItems

  return (
    <div className="flex flex-col w-full bg-slate-100 rounded">
      <div className="flex flex-col gap-6 p-6">
        <div className="w-full">
          <Link
            href={`/users/${initiatorInfo?._id}`}
            className="flex gap-3 items-center mb-3"
          >
            <div className="relative w-10 h-10 rounded-md overflow-hidden">
              <Image
                src={initiatorInfo?.imageUrl || '/images/dinosaur-bones.png'}
                fill
                alt={initiatorInfo?.username || 'User Image'}
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-bold">{`${initiatorInfo?.username}'s items`}</h2>
          </Link>
          <div className="flex mx-auto w-[315px] sm:w-[540px]">
            <ul className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {initiatorTradeItems &&
                initiatorTradeItems.map((item, index) => (
                  <li
                    key={`${item._id}-${index}`}
                    className="flex justify-center items-center w-[98px] h-[98px] bg-slate-200 rounded"
                  >
                    <Image
                      src={item.image}
                      alt={item.dinoName}
                      width={95}
                      height={95}
                      className="custom-inventory-img"
                    />
                  </li>
                ))}

              <li
                onClick={() => handleAddItemClick('initiator')}
                className="flex justify-center items-center w-[98px] h-[98px] bg-slate-200 rounded"
              >
                <PiPlusBold size={60} />
              </li>
            </ul>
          </div>
        </div>
        <hr />

        <div>
          <Link
            href={`/users/${receiverInfo?._id}`}
            className="flex gap-3 items-end mb-3"
          >
            <div className="relative w-10 h-10 rounded-md overflow-hidden">
              <Image
                src={receiverInfo?.imageUrl || '/images/dinosaur-bones.png'}
                fill
                alt={receiverInfo?.username || 'User image'}
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-bold">{`${receiverInfo?.username}'s items`}</h2>
          </Link>
          <div className="flex mx-auto w-[315px] sm:w-[540px]">
            <ul className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
              {receiverTradeItems &&
                receiverTradeItems.map((item, index) => (
                  <li
                    key={`${item._id}-${index}`}
                    className="flex justify-center items-center w-[98px] h-[98px] bg-slate-200 rounded"
                  >
                    <Image
                      src={item.image}
                      alt={item.dinoName}
                      width={95}
                      height={95}
                      className="custom-inventory-img"
                    />
                  </li>
                ))}

              <li
                onClick={() => handleAddItemClick('receiver')}
                className="flex justify-center items-center w-[98px] h-[98px] bg-slate-200 rounded"
              >
                <PiPlusBold size={60} />
              </li>
            </ul>
          </div>
        </div>
        <div>
          <button
            onClick={() => handleSubmitClick()}
            className="button-offer w-full"
          >
            Make offer
          </button>
        </div>
        {showModal && whosInventory && (
          <TraderInventoryModal
            show={true}
            onClose={() => setShowModal(false)}
            user={whosInventory === 'initiator' ? initiatorInfo : receiverInfo}
            items={currentInventory}
            owner={whosInventory}
            handlePushToTrade={handlePushToTrade}
          />
        )}
      </div>
    </div>
  )
}

export default MobileTrade
