'use client'

import React, { createContext, useContext, useEffect, useMemo } from 'react'
import StoreProvider, { useAppSelector } from '../redux'
import { Sidebar } from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useGetCurrentUserQuery } from '@/state/api'
import { User } from '../types'

const UserContext = createContext<{
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
} | null>(null)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({
  children,
  user,
  setUser,
}: {
  children: React.ReactNode
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}) => {
  const value = useMemo(() => ({ user, setUser }), [user, setUser])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  )
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)
  const { data: user } = useGetCurrentUserQuery()

  const [currentUser, setCurrentUser] = React.useState<User | null>(null)

  useEffect(() => {
    if (user) {
      setCurrentUser(user)
    }
  }, [user])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <UserProvider user={currentUser} setUser={setCurrentUser}>
      <div
        className={`flex ${
          isDarkMode
            ? 'bg-background text-textPrimary'
            : 'bg-background text-gray-900'
        } w-full min-h-screen`}
      >
        <Sidebar />
        <main
          className={`flex flex-col w-full h-full py-7 px-9 min-h-screen ${
            isDarkMode ? 'bg-black' : 'bg-gray-50'
          } ${isSideBarCollapsed ? 'md:pl-24' : 'md:pl-72'}`}
        >
          <Navbar />
          {children}
        </main>
      </div>
    </UserProvider>
  )
}

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper
