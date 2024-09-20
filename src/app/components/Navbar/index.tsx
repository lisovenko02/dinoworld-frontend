import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSideBarCollapsed } from '@/state'
import { Bell, Menu, Moon, Sun, UserRoundSearch } from 'lucide-react'
import React from 'react'

const Navbar = () => {
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
      {/* LEFT SIDE*/}
      <div className="flex justify-between items-center gap-5">
        {/* BURGER */}
        <button
          className="px-3 py-3 rounded-full hover:bg-blue-100"
          onClick={toggleSideBar}
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* SEARCH BAR */}
        {/* <div className="relative md:block hidden">
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="absolute flex items-center pointer-events-none inset-y-0 left-0 pl-3">
            <UserRoundSearch size={20} />
          </div>
        </div> */}
      </div>
      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div>
          <button onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Sun className="cursor-pointer" size={24} />
            ) : (
              <Moon className="cursor-pointer" size={24} />
            )}
          </button>
        </div>
        <div>
          <div className="relative">
            <Bell className="cursor-pointer" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              2
            </span>
          </div>
        </div>
        <hr className="w-0 h-7 border border-solid mx-3" />
        <div className="flex items-center gap-5">
          <div className="cursor-pointer">img</div>
          <button className="font-semibold cursor-pointer">IvanDjan</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
