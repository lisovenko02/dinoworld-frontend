'use client'

import SelectedDinoInfo from '@/app/components/SelectedDinoInfo'
import SelectedDinoInfoModal from '@/app/components/SelectedDinoInfoModal'
import { InventoryResponse } from '@/app/types'
import { useGetInventoryQuery } from '@/state/api'
import Image from 'next/image'
import React, { useState } from 'react'
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs'
import { useMediaQuery } from 'react-responsive'
import { useUser } from '../../dashboardWrapper'
import Link from 'next/link'
type InventoryProps = {
  params: { id: string }
}

const Inventory = ({ params }: InventoryProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedDinoId, setSelectedDinoId] = useState<string | null>(null)
  const [selectedRarity, setSelectedRarity] = useState<string>('All')
  const [showModal, setShowModal] = useState<boolean>(false)

  const { user } = useUser()

  const { data: inventoryItems } = useGetInventoryQuery({
    userId: params.id,
    page: currentPage,
  }) as {
    data: InventoryResponse | undefined
  }
  const items = inventoryItems?.items ?? []
  const owner = inventoryItems?.userInfo

  const filteredItems =
    selectedRarity === 'All'
      ? items
      : items.filter((item) => item.rarity === selectedRarity)

  const handleRarityClick = (rarity: string) => {
    setSelectedRarity(rarity)
    setCurrentPage(1)
  }

  const handleActiveDinoClick = (id: string) => {
    setSelectedDinoId(id)
    setShowModal(true)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const selectedDino = items?.find((item) => item._id === selectedDinoId)

  const dietImg =
    selectedDino?.diet === 'Carnivore'
      ? 'https://static.wikia.nocookie.net/jurassicworld-evolution/images/1/1f/Carnivore_icon.svg/revision/latest?cb=20210829102833'
      : selectedDino?.diet === 'Piscivore'
      ? 'https://static.wikia.nocookie.net/jurassicworld-evolution/images/6/65/Piscivore_icon.svg/revision/latest?cb=20210829102915'
      : 'https://static.wikia.nocookie.net/jurassicworld-evolution/images/4/44/Herbivore_icon.svg/revision/latest?cb=20210829102724'

  const rarityTextStyle =
    selectedDino && selectedDino.rarity === 'Legendary'
      ? 'text-amber-400'
      : selectedDino?.rarity === 'Super Rare'
      ? 'text-rose-600'
      : selectedDino?.rarity === 'Rare'
      ? 'text-purple-500'
      : selectedDino?.rarity === 'Common'
      ? 'text-blue-500'
      : ''

  const isTabletOrMobile = useMediaQuery({ minWidth: 815 })

  return (
    <div className="flex justify-center min-h-screen">
      <div className="max-w-[926px]">
        {/* UPPER SECTION */}
        <div className="flex flex-col gap-6">
          {/* USER INFO */}
          <div className="flex justify-between">
            <Link
              href={`/users/${owner?._id}`}
              className="flex gap-5 items-center cursor-pointer"
            >
              <Image
                src={owner?.imageUrl || '/images/dinosaur-bones.png'}
                width={60}
                height={60}
                alt="hello"
                className="rounded-lg"
              />
              <h2 className="font-bold text-xl">
                {`${owner?.username}'s inventory`}
              </h2>
            </Link>

            {user?._id !== params.id && (
              <Link href={`/trade/${params.id}`} className="button-offer my-2">
                {/* OFFER LINK */}
                Exchange offer
              </Link>
            )}
          </div>
          {/* RARITY */}
          {isTabletOrMobile && (
            <ul className="flex justify-around text-lg">
              {['All', 'Common', 'Rare', 'Super Rare', 'Legendary'].map(
                (rarity) => (
                  <li
                    key={rarity}
                    className={`list-rarity ${
                      selectedRarity === rarity ? 'isActive font-bold' : ''
                    }`}
                    onClick={() => handleRarityClick(rarity)}
                  >
                    {rarity}
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        {/* LOWER SECTION */}
        <div className="flex items-center justify-center p-3 border bg-slate-100 mt-4 ml-1.5 gap-5 max-w-[884px]">
          {/* INVENTORY ITEMS */}
          <div className="flex flex-col">
            <ul className="grid grid-cols-2 md:grid-cols-3 grid-cols-custom grid-rows-2 w-full ">
              {filteredItems &&
                filteredItems.map((item, index) => (
                  <li
                    key={`${item._id}-${index}`}
                    className="border w-[98px] h-[98px] items-center bg-slate-200 cursor-pointer mr-1.5 mb-1.5"
                    onClick={() => handleActiveDinoClick(item._id)}
                  >
                    <Image
                      src={item.image}
                      width={95}
                      height={95}
                      alt={`${item.dinoName}-${index}`}
                      className="rounded-lg custom-inventory-img "
                    />
                  </li>
                ))}
              {filteredItems &&
                Array.from({ length: 25 - filteredItems.length }).map(
                  (_, index) => (
                    <li
                      key={`empty-${index}`}
                      className="border w-[98px] h-[98px] items-center bg-slate-200 mr-1.5 mb-1.5"
                    ></li>
                  )
                )}
            </ul>
            <div className="flex gap-3 justify-end mr-2 mt-2 items-center">
              <BsArrowLeftSquare
                size="30px"
                className="cursor-pointer"
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
              />
              <span className="text-xl">
                {currentPage} of {inventoryItems?.totalPages}
              </span>
              <BsArrowRightSquare
                size="30px"
                className="cursor-pointer"
                onClick={() =>
                  currentPage < (inventoryItems?.totalPages || 1) &&
                  handlePageChange(currentPage + 1)
                }
              />
            </div>
          </div>
          {isTabletOrMobile ? (
            <div className="flex-col hidden md:flex w-[346px] items-center bg-slate-200 p-2 gap-3">
              {/* ITEM FULL-INFO */}
              {selectedDino ? (
                <SelectedDinoInfo
                  selectedDino={selectedDino}
                  rarityTextStyle={rarityTextStyle}
                  dietImg={dietImg}
                />
              ) : (
                <div className="h-full">
                  <p className="text-gray-500 text-lg italic mt-4">
                    Select a dinosaur to see details
                  </p>
                </div>
              )}
            </div>
          ) : (
            selectedDino &&
            showModal && (
              <SelectedDinoInfoModal
                show={true}
                onClose={() => setShowModal(false)}
                selectedDino={selectedDino}
                rarityTextStyle={rarityTextStyle}
                dietImg={dietImg}
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Inventory
