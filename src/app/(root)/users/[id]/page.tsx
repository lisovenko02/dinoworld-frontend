'use client'

import EditUserModal from '@/app/components/EditUserModal'
import { useGetCurrentUserQuery, useGetUserProfileQuery } from '@/state/api'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useUser } from '../../dashboardWrapper'
import Loader from '@/app/components/Loader'
import { notFound } from 'next/navigation'

interface ProfileProps {
  params: {
    id: string
  }
}

const Profile = ({ params }: ProfileProps) => {
  const { id: userId } = params
  const [showModal, setShowModal] = useState(false)

  const { user, setUser } = useUser()
  const { data: profileData, isLoading, error } = useGetUserProfileQuery(userId)
  const { data: currentUser } = useGetCurrentUserQuery()

  const profile = user && user._id === userId ? user : profileData

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser)
    }
  }, [currentUser, setUser])

  const handleModalOpenSwitch = () => {
    setShowModal(!showModal)
  }

  const hasInventory = profileData && profileData?.inventory?.length > 0

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-black">
        <Loader isLoading={true} />
      </div>
    )
  }

  if (error) {
    return notFound()
  }

  return (
    <div className="flex flex-col items-center py-10 px-4 sm:px-8 dark:bg-black min-h-screen">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-[#1A1A1A] p-6 rounded-lg shadow-md w-full max-w-5xl relative">
        {/* Avatar */}
        <div className="w-40 h-40 md:w-48 md:h-48 relative overflow-hidden rounded-full border-4 border-gray-200 dark:border-[#333333]">
          <Image
            src={profile?.imageUrl || '/images/dinosaur-bones.png'}
            alt="avatar"
            fill
            className="object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-200">
            {profile?.username}
          </h1>
          <div className="text-xl font-semibold text-gray-700 dark:text-zinc-300">
            <h3 className="dark:text-zinc-400">
              {profile?.lastName} {profile?.firstName}
            </h3>
            <p className="text-xl font-semibold">
              Email:{' '}
              <span className="text-lg font-medium dark:text-zinc-400">
                {profile?.email}
              </span>
            </p>
            {/* Trade Button */}
            {user?._id !== profile?._id && (
              <div className="mt-4">
                <Link
                  href={`/trade/${userId}`}
                  className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Trade
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        {user?._id === profile?._id && (
          <div className="absolute top-6 right-6">
            <button
              onClick={handleModalOpenSwitch}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Inventory Section */}
      <div className="mt-12 w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-zinc-200 mb-6">
          INVENTORY
        </h2>
        {hasInventory ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {profileData?.inventory?.map((product, index) => (
              <li
                key={`${product._id}-${index}`}
                className="flex items-center justify-center bg-gray-50 dark:bg-[#2A2A2A] p-4 rounded-lg shadow hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
              >
                <Image
                  src={product.image}
                  alt={`${product.dinoName}-${index}`}
                  width={100}
                  height={100}
                  className="rounded custom-inventory-img"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-700 dark:text-zinc-300">
            <p className="text-lg font-medium">
              This user has no items in their inventory.
            </p>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              Check back later!
            </p>
          </div>
        )}

        {showModal && (
          <EditUserModal onClose={handleModalOpenSwitch} show={true} />
        )}
      </div>
    </div>
  )
}

export default Profile
