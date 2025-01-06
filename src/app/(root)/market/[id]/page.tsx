'use client'

import Loader from '@/app/components/Loader'
import { useAddProductMutation, useGetProductQuery } from '@/state/api'
import Image from 'next/image'
import { notFound, useRouter } from 'next/navigation'
import React from 'react'
import CountUp from 'react-countup'
import toast from 'react-hot-toast'
import { GiDinosaurEgg } from 'react-icons/gi'

type ProductProps = { params: { id: string } }

const Product = ({ params }: ProductProps) => {
  const router = useRouter()

  const [addProduct, { isLoading: isAddingProduct }] = useAddProductMutation()

  const {
    data: product,
    isLoading: isFetchingProduct,
    error,
  } = useGetProductQuery(params.id)

  if (isFetchingProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-black">
        <Loader isLoading={true} />
      </div>
    )
  }

  if (error || !product) {
    return notFound()
  }

  const {
    dinoName,
    appeal,
    attack,
    defense,
    description,
    diet,
    era,
    family,
    image,
    likes,
    dislikes,
    price,
    rarity,
    type,
    _id,
  } = product

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
      setTimeout(() => {
        router.push('/market')
      }, 1000)
    } catch (error) {
      if (error && typeof error === 'object' && 'data' in error) {
        const typedError = error as { data: { message: string } }
        toast.error(`Failed: ${typedError.data.message}`)
      } else {
        toast.error('An unknown error occurred')
      }
    }
  }

  const rarityTextStyle =
    rarity === 'Legendary'
      ? 'text-amber-400'
      : rarity === 'Super Rare'
      ? 'text-rose-600'
      : rarity === 'Rare'
      ? 'text-purple-500'
      : 'text-blue-500'

  const dietImg =
    diet === 'Carnivore'
      ? 'https://static.wikia.nocookie.net/jurassicworld-evolution/images/1/1f/Carnivore_icon.svg/revision/latest?cb=20210829102833'
      : diet === 'Piscivore'
      ? 'https://static.wikia.nocookie.net/jurassicworld-evolution/images/6/65/Piscivore_icon.svg/revision/latest?cb=20210829102915'
      : 'https://static.wikia.nocookie.net/jurassicworld-evolution/images/4/44/Herbivore_icon.svg/revision/latest?cb=20210829102724'

  return (
    <div className="container mx-auto p-4">
      {/* Dino Image and Main Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-slate-100 shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 bg-gray-100 ml-4 dark:bg-gray-200 p-4">
          <div className="image-container">
            <Image
              src={image}
              alt={dinoName}
              layout="intrinsic"
              width={500}
              height={400}
              className="rounded-lg max-w-[500px] max-h-[400px]"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <div className="flex flex-col items-center lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-zinc-100">
                {dinoName}
              </h1>
              <div
                className={`flex text-2xl font-semibold mb-4 ${rarityTextStyle} justify-center lg:justify-start`}
              >
                {rarity}
              </div>
            </div>

            <div className="text-2xl font-bold mb-2 text-green-600">
              $
              <CountUp
                start={0}
                end={price}
                duration={2}
                separator=","
                className="inline"
              />
            </div>
          </div>

          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 space-y-1 mb-2">
            <p className="text-gray-900 dark:text-zinc-300 text-base font-semibold">
              <span className="text-lg font-bold">Era:</span> {era}
            </p>
            <p className="text-gray-900 dark:text-zinc-300 text-base font-semibold">
              <span className="text-lg font-bold">Family:</span> {family}
            </p>
            <p className="flex items-center gap-2 text-gray-900 dark:text-zinc-300 text-base font-semibold">
              <span className="text-lg font-bold">Diet:</span>
              <Image src={dietImg} width={15} height={15} alt={diet} />
              {diet}
            </p>
            <p className="flex items-center gap-2 text-gray-900 dark:text-zinc-300 text-base font-semibold">
              <span className="text-lg font-bold">Type:</span>
              {type}
            </p>
          </div>
          <p className="text-gray-900 dark:text-zinc-300 mb-4 text-lg leading-relaxed">
            {description}
          </p>

          <div className="flex justify-end">
            <button
              className="mt-6 bg-blue-600 text-white text-lg py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={isAddingProduct}
              onClick={() => handleSubmitProduct({ productId: _id, dinoName })}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section with CountUp */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white dark:bg-slate-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">
            Attack
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-zinc-300">
            <CountUp start={0} end={attack} duration={2} />
          </p>
        </div>
        <div className="bg-white dark:bg-slate-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">
            Defense
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-zinc-300">
            <CountUp start={0} end={defense} duration={2} />
          </p>
        </div>
        <div className="bg-white dark:bg-slate-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">
            Appeal
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-zinc-300">
            <CountUp start={0} end={appeal} duration={2} />
          </p>
        </div>
      </div>

      {/* Likes and Dislikes Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-slate-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
            Likes
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-zinc-300">
            {likes.map((like: string, index: number) => (
              <li
                key={index}
                className="flex gap-3 text-base font-semibold items-center"
              >
                <GiDinosaurEgg size={15} />
                {like}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
            Dislikes
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-zinc-300">
            {dislikes.map((dislike: string, index: number) => (
              <li
                key={index}
                className="flex gap-3 text-base font-semibold items-center"
              >
                <GiDinosaurEgg size={15} />
                {dislike}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Product
