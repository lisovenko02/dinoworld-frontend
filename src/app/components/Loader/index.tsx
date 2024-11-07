import React from 'react'
import { PacmanLoader } from 'react-spinners'

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <PacmanLoader color="#0932f5" size={40} loading={isLoading} />
    </div>
  )
}

export default Loader
