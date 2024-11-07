'use client'

import Loader from '@/app/components/Loader'
import UserCard from '@/app/components/UserCard'
import { useGetUsersQuery } from '@/state/api'
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  UserRoundSearch,
} from 'lucide-react'
import React, { useState } from 'react'

const Users = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const limit = 10

  const { data, error, isLoading } = useGetUsersQuery({
    page,
    limit,
    search,
  })

  if (isLoading) return <Loader isLoading={isLoading} />
  if (error) return <div>Error loading users.</div>

  const { users, totalPages, currentPage } = data || {}

  return (
    <div className="flex flex-col gap-5 min-h-screen">
      {/* SEARCH BAR */}
      <div className="relative md:block hidden">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="pl-10 pr-4 py-4 w-full border-2 bg-white rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="absolute flex items-center pointer-events-none inset-y-0 left-0 pl-3">
          <UserRoundSearch size={20} />
        </div>
      </div>
      {/* ARROW RIGHT */}
      <div className="flex justify-between">
        <h2 className="font-bold text-lg">Users</h2>
      </div>
      <hr color="#A9A9A9" />
      {/* USERS LIST */}
      <ul className="grid grid-cols-1 gap-5 ">
        {users && users.map((user) => <UserCard user={user} key={user._id} />)}
      </ul>
      <div className="flex justify-between items-end">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          <ArrowLeftCircle
            className={page === 1 ? 'text-gray-400' : 'text-blue-500'}
          />
        </button>
        <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          <ArrowRightCircle
            className={page === totalPages ? 'text-gray-400' : 'text-blue-500'}
          />
        </button>
      </div>
    </div>
  )
}

export default Users
