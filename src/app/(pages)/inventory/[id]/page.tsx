'use client'

import { useGetInventoryQuery } from '@/state/api'
import Image from 'next/image'
import React from 'react'

type InventoryProps = {
  params: { id: string }
}

const Inventory = ({ params }: InventoryProps) => {
  const { data: inventoryItems } = useGetInventoryQuery(params.id)
  console.log(inventoryItems)
  return (
    <div className="flex justify-center min-h-screen">
      <div className="max-w-[926px]">
        {/* UPPER SECTION */}
        <div className="flex flex-col gap-4">
          {/* USER INFO */}
          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
              <Image
                src="/images/dinosaur-bones.png"
                width={50}
                height={50}
                alt="hello"
                className="rounded-lg"
              />
              <h2>User Inventory</h2>
            </div>
            <button>Trade</button>
          </div>
          {/* RARITY */}
          <ul className="flex justify-around">
            <li className="cursor-pointer">All</li>
            <li className="cursor-pointer">Common</li>
            <li className="cursor-pointer">Rare</li>
            <li className="cursor-pointer">Super Rare</li>
            <li className="cursor-pointer">Legendary</li>
          </ul>
        </div>

        {/* LOWER SECTION */}
        <div className="p-3 border bg-slate-500 mt-4 flex gap-5">
          {/* INVENTORY ITEMS */}
          <ul className="grid grid-cols-3 grid-cols-custom grid-rows-2 w-full">
            {inventoryItems &&
              inventoryItems.map((item) => (
                <li
                  key={item.id}
                  className="border w-[105px] h-[102px] items-center bg-slate-800 cursor-pointer mr-1.5 mb-1.5"
                >
                  <Image
                    src={item.image}
                    width={95}
                    height={95}
                    alt="hello"
                    className="rounded-lg custom-inventory-img p-"
                  />
                </li>
              ))}
          </ul>
          <div className="flex-col hidden md:flex w-[346px]">
            {/* ITEM FULL-INFO */}
            <Image
              src="/images/dinosaur-bones.png"
              width={256}
              height={192}
              alt="hello"
              className="rounded-lg"
            />
            <h2>DINO</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory
