import React from 'react'

import PromptInput from './PromptInput'
const Prompt = () => {
  return (
    <div className='bg-[#F5F5F5] p-6 flex flex-col justify-start w-[37.5%] h-[100vh] gap-6'>
    <h1 className='text-3xl font-bold'>Prompt</h1>
    <PromptInput/>
    <PromptInput/>

    </div>
  )
}

export default Prompt