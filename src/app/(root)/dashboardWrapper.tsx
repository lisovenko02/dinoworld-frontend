'use client'

import React, { useEffect } from 'react'
import StoreProvider, { useAppSelector } from '../redux'
import { Sidebar } from '../components/Sidebar'
import Navbar from '../components/Navbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  )

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

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
    <div
      className={`flex ${
        isDarkMode
          ? 'bg-background text-textPrimary'
          : 'bg-background text-gray-900'
      } w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 ${
          isDarkMode ? 'bg-black' : 'bg-gray-50'
        } ${isSideBarCollapsed ? 'md:pl-24' : 'md:pl-72'}`}
      >
        <Navbar />
        {children}
      </main>
    </div>
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
