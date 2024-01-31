import React from 'react'
import { Rings } from 'react-loader-spinner'


const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center">
    <Rings 
      visible={true}
      height={80}
      width={80}
      color="#F7BA37"
      ariaLabel="rings-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
    <p className="text-[#919191]">Loading the data.</p>

    </div>
  )
}

export default Loader