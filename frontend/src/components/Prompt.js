import React from 'react'

import PromptInput from './PromptInput'
const Prompt = ({data}) => {
  return (
    <div className='bg-[#F5F5F5] p-6 flex flex-col justify-start w-[37.5%] h-[105vh] gap-6 no-scrollbar'>
      <div className='flex justify-between gap-5 items-center'>
        <h1 className='text-3xl font-bold'>Prompt</h1>
        <div>
        <select>
            <option value="fruit">Age</option>

            <option value="vegetable">Language Skills</option>

            <option value="meat">Meat</option>

          </select>
      </div>
        
      </div>
      
      
      <PromptInput data={data}/>
    

    </div>
  )
}

export default Prompt