'use client'

import Loader from './components/Loader'

export default function Loading() {
  return (
    <div className="loading-screen">
      <Loader isLoading={true} />
    </div>
  )
}
