import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <RotatingLines
        width={80}
        height={80}
        color="#808080"
        visible={isLoading}
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}

export default Loader
