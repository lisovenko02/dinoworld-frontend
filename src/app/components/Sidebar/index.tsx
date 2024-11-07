import { useUser } from '@/app/(root)/dashboardWrapper'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSideBarCollapsed } from '@/state'
import {
  Backpack,
  BaggageClaim,
  CircleDollarSign,
  SquareUserRound,
  LucideIcon,
  Menu,
  Store,
  UsersRound,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { GiDinosaurBones } from 'react-icons/gi'
import { useLogoutMutation } from '@/state/api'
import toast from 'react-hot-toast'

interface SidebarLinkProps {
  href: string
  icon: LucideIcon
  label: string
  isCollapsed: boolean
  isLogout?: boolean
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
  isLogout = false,
}: SidebarLinkProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const [logout] = useLogoutMutation()

  const isActive = pathname === href

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      router.push('/sign-in')
    } catch {
      toast.error('Something went wrong')
    }
  }

  return isLogout ? (
    <button
      onClick={handleLogout}
      className={`relative w-full flex items-center cursor-pointer gap-3 hover:text-blue-500 hover:bg-blue-100 ${
        isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'
      } ${isActive ? 'text-blue-500 font-bold' : 'text-gray-700'}`}
    >
      <Icon className="w-6 h-6" />
      <span className={`${isCollapsed ? 'hidden' : 'block'} font-medium`}>
        {label}
      </span>
    </button>
  ) : (
    <Link href={href}>
      <div
        className={`relative flex items-center cursor-pointer gap-3 hover:text-blue-500 hover:bg-blue-100 ${
          isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'
        } ${isActive ? 'text-blue-500 font-bold' : 'text-gray-700'}`}
      >
        {isActive && (
          <div
            className="absolute right-2 top-1 bottom-1 w-1 bg-blue-500"
            style={{ borderRadius: '0 4px 4px 0' }}
          />
        )}

        <Icon className="w-6 h-6" />
        <span className={`${isCollapsed ? 'hidden' : 'block'} font-medium`}>
          {label}
        </span>
      </div>
    </Link>
  )
}

export const Sidebar = () => {
  const dispatch = useAppDispatch()
  const { user } = useUser()

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  )
  const toggleSidebar = () => {
    dispatch(setIsSideBarCollapsed(!isSidebarCollapsed))
  }

  const sidebarClassNames = `fixed sidebar bg-sidebar flex flex-col justify-between ${
    isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`

  return (
    <div className={sidebarClassNames}>
      <div>
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

        <div className="mt-8">
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
          {user && (
            <>
              <SidebarLink
                href="/replenishment"
                icon={CircleDollarSign}
                label="Replenishment"
                isCollapsed={isSidebarCollapsed}
              />
              <SidebarLink
                href={`/inventory/${user?._id}`}
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
                href={`/users/${user?._id}`}
                icon={SquareUserRound}
                label="Profile"
                isCollapsed={isSidebarCollapsed}
              />
            </>
          )}
        </div>
      </div>

      <div>
        <div className="mb-4">
          <SidebarLink
            href="/sign-in"
            icon={LogOut}
            label="Log Out"
            isCollapsed={isSidebarCollapsed}
            isLogout={true}
          />
        </div>
        <div className={`${isSidebarCollapsed ? 'hidden' : 'block'} mb-10`}>
          <p className="text-center text-xs">&copy; 2024 DINOWORLD</p>
        </div>
      </div>
    </div>
  )
}
