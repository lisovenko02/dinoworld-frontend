'use client'

import { useDepositToAccMutation } from '@/state/api'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaRegMoneyBill1 } from 'react-icons/fa6'
import { useUser } from '../dashboardWrapper'
import Loader from '@/app/components/Loader'
import ProtectedRoute from '@/app/components/ProtectedRoute'

const PAYMENT_OPTIONS = [50000, 150000, 500000, 1000000, 2000000]

const Replenishment = () => {
  const router = useRouter()
  const { user, setUser } = useUser()
  const [depositToAcc] = useDepositToAccMutation()
  const [currentBalance, setCurrentBalance] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (user?.money) {
      setCurrentBalance(user.money)
    }
  }, [user])

  const handleDepositClick = async (deposit: number) => {
    setIsLoading(true)
    try {
      await depositToAcc({ deposit })
      const newBalance = currentBalance + deposit
      setCurrentBalance(newBalance)

      setUser((prevUser) => {
        if (prevUser) {
          return { ...prevUser, money: newBalance }
        }
        return prevUser
      })

      toast.success('You have successfully deposit to your account')

      setTimeout(() => {
        setIsLoading(false)
        router.push('/market')
      }, 2000)
    } catch (error) {
      toast.error('Failed to deposit')
      setIsLoading(false)
    }
  }
  return isLoading ? (
    <Loader isLoading={isLoading} />
  ) : (
    <ProtectedRoute>
      <div className="flex gap-6 justify-between items-start py-8 px-4 min-h-screen transition-colors duration-200">
        {/* Payment Options Section */}
        <div className="flex flex-col w-full lg:w-2/3 p-6 rounded-lg shadow-lg bg-slate-100 transition-colors duration-200">
          <h1 className="text-xl font-bold mb-6 text-gray-900">
            Select Top-Up Amount
          </h1>
          <ul className="flex flex-col gap-4">
            {PAYMENT_OPTIONS?.map((option, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-5 bg-slate-200 transition-colors duration-200 border dark:border-gray-500 rounded-lg shadow-md"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {option.toLocaleString()} $
                  </h2>
                </div>
                <button
                  onClick={() => handleDepositClick(option)}
                  className="flex items-center gap-3 bg-green-400 text-green-800 px-5 py-2 rounded-lg hover:bg-green-500 transition-colors duration-200 shadow-sm"
                  disabled={isLoading}
                >
                  <FaRegMoneyBill1 size={20} />
                  <h2 className="font-semibold text-base">Deposit</h2>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Balance Section */}
        <div className="flex flex-col items-center p-6 bg-slate-100 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-bold text-gray-900">Your Balance</h2>
          <p className="text-4xl font-bold text-green-600 mt-4">
            ${currentBalance?.toLocaleString() || 0}
          </p>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Replenishment
