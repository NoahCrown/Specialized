import React from 'react'

import PromptInput from './PromptInput'
const Prompt = ({data}) => {
  return (
    <div className='bg-[#F5F5F5] p-6 flex flex-col justify-start w-[37.5%] h-[105vh] gap-6 no-scrollbar'>
    <h1 className='text-3xl font-bold'>Prompt</h1>
    <PromptInput data={data}/>
    

    </div>
  )
}

export default Prompt