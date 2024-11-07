import Image from 'next/image'
import React, { useState } from 'react'
import { useConfirmedTradeMutation } from '@/state/api'
import { Trade } from '@/app/types'
import ProductList from '../TradeProductList'

export interface TradeCardProps {
  trade: Trade
}

const TradeCard = ({ trade }: TradeCardProps) => {
  const {
    initiator,
    initiatorProducts,
    receiver,
    receiverProducts,
    _id: tradeId,
    status,
    isLoggedUserReceiver,
  } = trade
  const [confirmedTrade] = useConfirmedTradeMutation()
  const [loading, setLoading] = useState<boolean>(false)
  const [currentStatus, setCurrentStatus] = useState<string>(status)
  console.log('initiator', initiator)
  console.log('receiver', receiver)
  console.log('isLoggedUserReceiver', isLoggedUserReceiver)
  const handleConfirmedTrade = async (newStatus: string) => {
    setLoading(true)
    try {
      await confirmedTrade({ tradeId, status: newStatus }).unwrap()
      console.log('Trade status updated:', { tradeId, newStatus })
      setCurrentStatus(newStatus)
    } catch (error) {
      console.error('Failed to update trade status:', error)
    } finally {
      setLoading(false)
    }
  }

  const isCompletedOrCanceled =
    currentStatus === 'Completed' || currentStatus === 'Canceled'

  return (
    <li
      className={`flex flex-col gap-2 p-3 ${
        isCompletedOrCanceled ? 'opacity-70 pointer-events-none' : ''
      }`}
    >
      <div className="flex gap-3 items-center">
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src={initiator.imageUrl || '/images/dinosaur-bones.png'}
            layout="fill"
            objectFit="cover"
            alt={trade._id}
            className="rounded-full border border-gray-300"
          />
        </div>
        <p className="font-semibold text-lg">{`${initiator.username} offers a trade`}</p>
      </div>

      <div className="p-4 border bg-slate-100 relative rounded-md">
        <ProductList trader={initiator} products={initiatorProducts} />

        <div className="relative my-4">
          <hr className="border-t border-gray-300" />

          {currentStatus === 'Completed' && (
            <div className="absolute inset-0 top-[-12px] flex justify-center">
              <span className="px-2 bg-slate-100 text-base text-green-500 font-semibold">
                Trade has been accepted
              </span>
            </div>
          )}
          {currentStatus === 'Canceled' && (
            <div className="absolute inset-0 top-[-12px] flex justify-center">
              <span className="px-2 bg-slate-100 text-base text-red-500 font-semibold">
                Trade was canceled by the receiver
              </span>
            </div>
          )}
        </div>

        <ProductList trader={receiver} products={receiverProducts} />
      </div>

      {currentStatus === 'Pending' && isLoggedUserReceiver && (
        <div className="flex justify-end gap-3 mt-3">
          <button
            onClick={() => handleConfirmedTrade('Completed')}
            className="transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm'}
          </button>
          <button
            onClick={() => handleConfirmedTrade('Canceled')}
            className="transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Cancel'}
          </button>
        </div>
      )}
    </li>
  )
}

export default TradeCard
