import { Product } from '@/app/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export interface SelectedDinoInfoProps {
  selectedDino: Product
  rarityTextStyle: string
  dietImg: string
}

const SelectedDinoInfo = ({
  selectedDino,
  rarityTextStyle,
  dietImg,
}: SelectedDinoInfoProps) => {
  return (
    <>
      <Image
        src={selectedDino.image}
        width={256}
        height={192}
        alt={selectedDino.dinoName}
        className="rounded-lg custom-img bg-slate-300 p-2"
      />
      <h2 className="text-2xl font-bold">{selectedDino.dinoName}</h2>
      <hr className="border border-solid w-full border-slate-100" />
      <p className={`text-xl font-semibold ${rarityTextStyle}`}>
        {selectedDino.rarity.toUpperCase()}
      </p>
      <hr className="border border-solid w-full border-slate-100" />
      <p className="text-xl">
        <span className="font-bold">Type: </span>
        {selectedDino.type}
      </p>
      <hr className="border border-solid w-full border-slate-100" />
      <p className="text-xl">
        <span className="font-bold">Family: </span>
        {selectedDino.family}
      </p>
      <hr className="border border-solid w-full border-slate-100" />
      <p className="text-xl">
        <span className="font-bold">Era: </span>
        {selectedDino.era}
      </p>
      <hr className="border border-solid w-full border-slate-100" />
      <p className="flex gap-1 text-xl">
        <span className="font-bold">Diet: </span>
        <Image
          src={dietImg}
          width={15}
          height={15}
          alt={selectedDino.dinoName}
        />
        {selectedDino.diet}
      </p>

      <hr className="border border-solid w-full border-slate-100" />

      <Link
        href={`/market/${selectedDino._id}`}
        className="flex items-center justify-center w-full mt-4 px-4 py-2 bg-blue-500 text-gray-50 font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Details
      </Link>
    </>
  )
}

export default SelectedDinoInfo
