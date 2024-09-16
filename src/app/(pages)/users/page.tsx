'use client'

import UserCard from '@/app/(components)/UserCard'
import { useGetUsersQuery } from '@/state/api'
import { ArrowRightCircle, UserRoundSearch } from 'lucide-react'
import React from 'react'

const Users = () => {
  const { data: users } = useGetUsersQuery()

  console.log(users)
  return (
    <div className="flex flex-col gap-5 h-full">
      {/* SEARCH BAR */}
      <div className="relative md:block hidden">
        <input
          type="text"
          className="pl-10 pr-4 py-4 w-full border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="absolute flex items-center pointer-events-none inset-y-0 left-0 pl-3">
          <UserRoundSearch size={20} />
        </div>
      </div>
      {/* ARROW RIGHT */}
      <div className="flex justify-between">
        <h2 className="font-bold text-lg">Users</h2>
        <ArrowRightCircle />
      </div>
      <hr color="#A9A9A9" />
      {/* USERS LIST */}
      <ul className="grid grid-cols-1 gap-5 ">
        {users && users.map((user) => <UserCard user={user} key={user.id} />)}
      </ul>
    </div>
  )
}

export default Users
