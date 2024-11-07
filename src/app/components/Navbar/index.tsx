import { useUser } from '@/app/(root)/dashboardWrapper'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSideBarCollapsed } from '@/state'
import { Menu, Moon, Sun } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const { user } = useUser()

  const dispatch = useAppDispatch()

  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  )
  const toggleSideBar = () => {
    dispatch(setIsSideBarCollapsed(!isSideBarCollapsed))
  }

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)
  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode))
  }

  return (
    <div className="flex justify-between items-center w-full mb-5">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        {/* BURGER */}
        <button
          className="px-3 py-3 rounded-full hover:bg-blue-100"
          onClick={toggleSideBar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button onClick={toggleDarkMode}>
          {isDarkMode ? (
            <Sun className="cursor-pointer" size={24} />
          ) : (
            <Moon className="cursor-pointer" size={24} />
          )}
        </button>

        <hr className="w-0 h-7 border border-solid mx-3" />

        {/* User Information */}
        {user ? (
          <div className="flex items-center gap-5">
            <Link
              href={`/users/${user._id}`}
              className="cursor-pointer w-8 h-8 bg-gray-400 rounded-full"
            >
              <Image
                src={user.imageUrl || '/images/dinosaur-bones.png'}
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full"
                width={100}
                height={100}
              />
            </Link>
            <div>
              <Link
                href={`/users/${user._id}`}
                className="font-semibold text-gray-900 cursor-pointer"
              >
                {user.username}
              </Link>
              <Link href={'/replenishment'}>
                <p className="text-sm text-green-600 font-medium">
                  $
                  {user.money?.toLocaleString('en-US', {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </Link>
            </div>
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
