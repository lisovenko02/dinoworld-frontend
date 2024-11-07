'use client'

import MobileTrade from '@/app/components/MobileTrade'
import {
  Product,
  OwnerAndProductProps,
  TransferDoubleClickProps,
} from '@/app/types'
import {
  useGetTradersInventoriesQuery,
  useRequestTradeMutation,
} from '@/state/api'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { PiArrowSquareLeftBold, PiArrowSquareRightBold } from 'react-icons/pi'

interface TradePageProps {
  params: {
    id: string
  }
}
import { useMediaQuery } from 'react-responsive'
import { showErrorToast } from '../../../../../lib/utils'
import ProtectedRoute from '@/app/components/ProtectedRoute'

const ITEMS_PER_PAGE = 16

const TradePage = ({ params }: TradePageProps) => {
  const router = useRouter()

  const { id: receiverId } = params
  const { data: tradersProducts } = useGetTradersInventoriesQuery({
    receiverId,
  })
  const [requestTrade] = useRequestTradeMutation()
  console.log('tradersProducts', tradersProducts)
  const [whosInventory, setWhosInventory] = useState<'initiator' | 'receiver'>(
    'initiator'
  )
  const [initiatorItems, setInitiatorItems] = useState<Product[]>([])
  const [receiverItems, setReceiverItems] = useState<Product[]>([])
  const [initiatorTradeItems, setInitiatorTradeItems] = useState<Product[]>([])
  const [receiverTradeItems, setReceiverTradeItems] = useState<Product[]>([])
  const [draggedItem, setDraggedItem] = useState<Product | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  console.log('tradersProducts', tradersProducts)
  const initiator = tradersProducts?.initiator?.user || null
  const receiver = tradersProducts?.receiver?.user || null

  useEffect(() => {
    if (tradersProducts) {
      setInitiatorItems(tradersProducts.initiator.products || [])
      setReceiverItems(tradersProducts.receiver.products || [])
    }
  }, [tradersProducts])

  const handleChangeInventory = (owner: 'initiator' | 'receiver') => {
    setWhosInventory(owner)
    setCurrentPage(1)
  }

  const handleDragStart = (product: Product) => {
    setDraggedItem(product)
  }

  const removeOneItemFromInventory = ({
    owner,
    product,
  }: OwnerAndProductProps) => {
    if (owner === 'initiator') {
      setInitiatorItems((prev) => {
        const index = prev.findIndex((item) => item._id === product?._id)
        if (index !== -1) {
          return [...prev.slice(0, index), ...prev.slice(index + 1)]
        }
        return prev
      })
    } else if (owner === 'receiver') {
      setReceiverItems((prev) => {
        const index = prev.findIndex((item) => item._id === product?._id)
        if (index !== -1) {
          return [...prev.slice(0, index), ...prev.slice(index + 1)]
        }
        return prev
      })
    }
  }

  const handleDrop = (owner: 'initiator' | 'receiver') => {
    if (draggedItem) {
      if (owner === 'initiator') {
        setInitiatorTradeItems((prev) => [...prev, draggedItem])
        removeOneItemFromInventory({ owner: 'initiator', product: draggedItem })
      } else if (owner === 'receiver') {
        setReceiverTradeItems((prev) => [...prev, draggedItem])
        removeOneItemFromInventory({ owner: 'receiver', product: draggedItem })
      }
      setDraggedItem(null)
    }
  }

  const handleDoubleClick = ({
    product,
    owner,
    isInTrade,
  }: TransferDoubleClickProps) => {
    if (owner === 'initiator') {
      if (isInTrade) {
        setInitiatorTradeItems((prev) => {
          const firstIndex = prev.findIndex(
            (tradeItem) => tradeItem._id === product._id
          )

          if (firstIndex !== -1) {
            return [...prev.slice(0, firstIndex), ...prev.slice(firstIndex + 1)]
          }
          return prev
        })

        setInitiatorItems((prevItems) => [...prevItems, product])
      } else {
        setInitiatorTradeItems((prev) => [...prev, product])

        setInitiatorItems((prevItems) => {
          const firstIndex = prevItems.findIndex(
            (inventoryItem) => inventoryItem._id === product._id
          )
          if (firstIndex !== -1) {
            return [
              ...prevItems.slice(0, firstIndex),
              ...prevItems.slice(firstIndex + 1),
            ]
          }

          return prevItems
        })
      }
    } else if (owner === 'receiver') {
      if (isInTrade) {
        setReceiverTradeItems((prev) => {
          const firstIndex = prev.findIndex(
            (tradeItem) => tradeItem._id === product._id
          )

          if (firstIndex !== -1) {
            return [...prev.slice(0, firstIndex), ...prev.slice(firstIndex + 1)]
          }
          return prev
        })

        setReceiverItems((prevItems) => [...prevItems, product])
      } else {
        setReceiverTradeItems((prev) => [...prev, product])

        setReceiverItems((prevItems) => {
          const firstIndex = prevItems.findIndex(
            (inventoryItem) => inventoryItem._id === product._id
          )
          if (firstIndex !== -1) {
            return [
              ...prevItems.slice(0, firstIndex),
              ...prevItems.slice(firstIndex + 1),
            ]
          }

          return prevItems
        })
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLUListElement>) => {
    e.preventDefault()
  }

  const products =
    whosInventory === 'initiator'
      ? initiatorItems.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
        )
      : receiverItems.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
        )

  const totalPages = Math.ceil(
    (whosInventory === 'initiator'
      ? initiatorItems.length
      : receiverItems.length) / ITEMS_PER_PAGE
  )

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // FOR PHONE
  const handlePushToTrade = ({ product, owner }: OwnerAndProductProps) => {
    if (owner === 'initiator') {
      setInitiatorTradeItems((prev) => [...prev, product])
      removeOneItemFromInventory({ product, owner: 'initiator' })
    } else {
      setReceiverTradeItems((prev) => [...prev, product])
      removeOneItemFromInventory({ product, owner: 'receiver' })
    }
  }

  const handleSubmitClick = async () => {
    if (receiverTradeItems.length === 0 && initiatorTradeItems.length === 0) {
      toast.error('You must select at least one item to trade.')
      return
    }

    try {
      await requestTrade({
        receiverId,
        receiverProducts: receiverTradeItems.map((item) => item._id),
        initiatorProducts: initiatorTradeItems.map((item) => item._id),
      })
      router.push('/trade')
    } catch (error) {
      showErrorToast(error)
    }
  }

  const isDesktop = useMediaQuery({ minWidth: 1010 })
  return (
    <ProtectedRoute>
      <div className="flex justify-center items-center min-h-screen">
        {isDesktop ? (
          <div className="flex gap-4 w-[936px]">
            {/* LEFTSIDE CONTENT */}
            <div className="flex flex-col gap-4 w-[458px] bg-slate-100 rounded">
              {/* SWITCH INVENTORY */}
              <div className="flex items-center gap-3 justify-center mt-4">
                <button
                  onClick={() => handleChangeInventory('initiator')}
                  disabled={whosInventory === 'initiator'}
                  className={`relative text-base font-medium px-6 py-2 transition-colors duration-300 ease-in-out border-2 rounded-md ${
                    whosInventory === 'initiator'
                      ? 'bg-gray-800  text-gray-200  border-gray-700'
                      : 'bg-gray-100 text-gray-900  border-gray-300 hover:bg-gray-400'
                  }`}
                >
                  Your inventory
                </button>

                <button
                  onClick={() => handleChangeInventory('receiver')}
                  disabled={whosInventory === 'receiver'}
                  className={`relative text-base font-medium px-6 py-2 transition-colors duration-300 ease-in-out border-2 rounded-md ${
                    whosInventory === 'receiver'
                      ? 'bg-gray-800  text-gray-200  border-gray-700'
                      : 'bg-gray-100 text-gray-900  border-gray-300 hover:bg-gray-400'
                  }`}
                >
                  Their inventory
                </button>
              </div>

              {/* INVENTORY */}
              <div className="py-[19px] px-[16px]">
                <ul className="grid grid-cols-4 pl-1.5">
                  {products &&
                    products.map((product, index) => (
                      <li
                        className="border w-[98px] h-[98px] items-center bg-slate-200 cursor-pointer mr-1.5 mb-1.5"
                        key={`${product._id}-${index}`}
                        draggable
                        onDragStart={() => handleDragStart(product)}
                        onDoubleClick={() =>
                          handleDoubleClick({
                            product,
                            owner: whosInventory,
                            isInTrade: false,
                          })
                        }
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

                  {Array.from({ length: 16 - products.length }).map(
                    (_, index) => (
                      <li
                        key={`empty-left-${index}`}
                        className="border w-[98px] h-[98px] items-center bg-slate-200 mr-1.5 mb-1.5"
                      ></li>
                    )
                  )}
                </ul>
                {/* PAGE PAGINATION */}
                <div className="flex gap-3 justify-end mt-4 items-center">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="cursor-pointer"
                  >
                    <PiArrowSquareLeftBold size={40} />
                  </button>
                  <p className="font-bold text-xl">{`${currentPage} / ${totalPages}`}</p>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="cursor-pointer"
                  >
                    <PiArrowSquareRightBold size={40} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHTSIDE CONTENT */}
            <div className="flex flex-col gap-3 bg-slate-100 w-[458px] py-[19px] px-[16px]">
              {/* TRADES CONTENT */}
              <div className="flex flex-col gap-3">
                {/* YOUR TRADE */}
                <div className="">
                  <div className="flex gap-3 items-center mb-3">
                    <div className="relative w-10 h-10 rounded-md overflow-hidden">
                      <Image
                        src={
                          initiator?.imageUrl || '/images/dinosaur-bones.png'
                        }
                        fill
                        alt={initiator?.username || 'User Image'}
                        className="object-cover"
                      />
                    </div>
                    <h2 className="mb-3 text-lg font-semibold">Your items</h2>
                  </div>
                  <ul
                    className={`grid grid-cols-4  ${
                      whosInventory === 'receiver'
                        ? 'pointer-events-none opacity-70'
                        : ''
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('initiator')}
                  >
                    {initiatorTradeItems.map((product, index) => (
                      <li
                        key={`${product._id}-${index}`}
                        onDoubleClick={() =>
                          handleDoubleClick({
                            product,
                            owner: 'initiator',
                            isInTrade: true,
                          })
                        }
                        className="border w-[98px] h-[100px] items-center bg-slate-200 cursor-pointer mr-1.5 mb-1.5"
                      >
                        <Image
                          src={product.image}
                          alt={product.dinoName}
                          width={95}
                          height={95}
                          draggable
                          onDragStart={() => handleDragStart(product)}
                          className="custom-inventory-img"
                        />
                      </li>
                    ))}

                    {Array.from({ length: 8 - initiatorTradeItems.length }).map(
                      (_, index) => (
                        <li
                          key={`empty-right-${index}`}
                          className="border w-[98px] h-[100px] items-center bg-slate-200 mr-1.5 mb-1.5"
                        ></li>
                      )
                    )}
                  </ul>
                </div>
                <hr />
                {/* THEIR TRADE */}
                <div>
                  <div className="flex gap-3 items-end mb-3">
                    <div className="relative w-10 h-10 rounded-md overflow-hidden">
                      <Image
                        src={receiver?.imageUrl || '/images/dinosaur-bones.png'}
                        fill
                        alt={receiver?.username || 'User image'}
                        className="object-cover"
                      />
                    </div>
                    <h2 className="mb-3 text-lg font-semibold">{`${receiver?.username}'s items`}</h2>
                  </div>
                  <ul
                    className={`grid grid-cols-4 ${
                      whosInventory === 'initiator'
                        ? 'pointer-events-none opacity-70'
                        : ''
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('receiver')}
                  >
                    {receiverTradeItems.map((product, index) => (
                      <li
                        key={`${product._id}-${index}`}
                        onDoubleClick={() =>
                          handleDoubleClick({
                            product,
                            owner: 'receiver',
                            isInTrade: true,
                          })
                        }
                        className="border w-[98px] h-[100px] items-center bg-slate-200 cursor-pointer mr-1.5 mb-1.5"
                      >
                        <Image
                          src={product.image}
                          alt={product.dinoName}
                          width={95}
                          height={95}
                          draggable
                          onDragStart={() => handleDragStart(product)}
                          className="custom-inventory-img"
                        />
                      </li>
                    ))}

                    {Array.from({ length: 8 - receiverTradeItems.length }).map(
                      (_, index) => (
                        <li
                          key={`empty-right-${index}`}
                          className="border w-[98px] h-[100px] items-center bg-slate-200 mr-1.5 mb-1.5"
                        ></li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              {/* SUBMIT BTN */}
              <div>
                <button
                  onClick={() => handleSubmitClick()}
                  className="button-offer w-full"
                >
                  Make offer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <MobileTrade
            initiatorItems={initiatorItems}
            initiatorInfo={initiator}
            initiatorTradeItems={initiatorTradeItems}
            receiverItems={receiverItems}
            receiverInfo={receiver}
            receiverTradeItems={receiverTradeItems}
            handlePushToTrade={handlePushToTrade}
            handleSubmitClick={handleSubmitClick}
          />
        )}
      </div>
    </ProtectedRoute>
  )
}

export default TradePage
