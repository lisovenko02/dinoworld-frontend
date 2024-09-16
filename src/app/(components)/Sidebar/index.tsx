import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSideBarCollapsed } from '@/state'
import {
  Backpack,
  BaggageClaim,
  CircleDollarSign,
  GalleryVerticalEnd,
  LucideIcon,
  Menu,
  Store,
  UsersRound,
} from 'lucide-react'
import Link from 'next/link'
import { GiDinosaurBones } from 'react-icons/gi'

interface SidebarLinkProps {
  href: string
  icon: LucideIcon
  label: string
  isCollapsed: boolean
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  return (
    <Link href={href}>
      <div
        className={`
        flex items-center cursor-pointer hover:text-blue-500 hover:bg-blue-100 gap-3 ${
          isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'
        }
        `}
      >
        <Icon className="w-6 h-6" />
        <span
          className={`${
            isCollapsed ? 'hidden' : 'block'
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  )
}

export const Sidebar = () => {
  const dispatch = useAppDispatch()

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  )
  const toggleSidebar = () => {
    dispatch(setIsSideBarCollapsed(!isSidebarCollapsed))
  }

  const sidebarClassNames = `fixed sidebar bg-sidebar flex flex-col ${
    isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`

  return (
    <div className={sidebarClassNames}>
      {/* COMPANY LOGO AND NAME*/}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? 'px-5' : 'px-8'
        }`}
      >
        <Link href="/">
          <GiDinosaurBones size={30} color="#b87333" />
        </Link>
        <Link
          href="/"
          className={`font-extrabold text-2xl ${
            isSidebarCollapsed ? 'hidden' : 'block'
          }`}
        >
          DINOWORLD
        </Link>
        <button
          className="md:hidden px-3 py-3 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/market"
          icon={Store}
          label="Market"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={UsersRound}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/replenishment"
          icon={CircleDollarSign}
          label="Replenishment"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Backpack}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/trade"
          icon={BaggageClaim}
          label="Trade"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/tradeHistory"
          icon={GalleryVerticalEnd}
          label="Trade History"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? 'hidden' : 'block'} mb-10`}>
        <p className="text-center text-xs">&copy; 2024 DINOWORLD</p>
      </div>
    </div>
  )
}
