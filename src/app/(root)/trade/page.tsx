'use client'

import ProtectedRoute from '@/app/components/ProtectedRoute'
import TradeCard from '@/app/components/TradeCard'
import {
  useGetTradeCountByStatusQuery,
  useGetUserTradesQuery,
} from '@/state/api'
import React from 'react'
import {
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from 'react-icons/ai'

const Trades = () => {
  const { data: trades } = useGetUserTradesQuery()
  const { data: tradeCountByStatus } = useGetTradeCountByStatusQuery()

  const statusIcons = {
    Pending: <AiOutlineClockCircle className="text-blue-500 mr-2" />,
    Completed: <AiOutlineCheckCircle className="text-green-500 mr-2" />,
    Canceled: <AiOutlineCloseCircle className="text-red-500 mr-2" />,
  }

  return (
    <ProtectedRoute>
      <div className="flex justify-center w-full">
        <div className="max-w-[920px] w-full px-4 lg:px-8 flex flex-col-reverse lg:flex-row gap-8">
          <div className="max-w-full lg:w-2/3">
            <ul className="flex flex-col gap-6">
              {trades && trades.length > 0 ? (
                trades.map((trade) => (
                  <TradeCard trade={trade} key={trade._id} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow">
                  <p className="text-gray-700 text-lg">No trades found</p>
                </div>
              )}
            </ul>
          </div>

          <div className="w-full lg:w-1/3 mt-10">
            <div className="sticky top-10 p-6 bg-slate-100 shadow-lg rounded-lg border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Trade Summary
              </h3>
              {tradeCountByStatus ? (
                <ul className="flex flex-col gap-4">
                  {tradeCountByStatus.tradeCounts.map((status) => (
                    <li
                      key={status._id}
                      className="flex justify-between items-center text-lg"
                    >
                      <span className="flex items-center">
                        {statusIcons[status._id]}
                        <span className="font-medium">{status._id}:</span>
                      </span>
                      <span className="font-bold">{status.count}</span>
                    </li>
                  ))}
                  <li className="flex justify-between items-center text-lg mt-4 font-medium">
                    <span>Total Trades:</span>
                    <span className="font-bold">
                      {tradeCountByStatus.totalTrades}
                    </span>
                  </li>
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow">
                  <p className="text-gray-700 text-lg">
                    Loading trade summary...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Trades
