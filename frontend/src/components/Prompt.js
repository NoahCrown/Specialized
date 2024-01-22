import React from 'react'
import { useCandidate } from '../context/Context';


import PromptInput from './PromptInput'
const Prompt = () => {
  const { dataToInfer, handleChange } = useCandidate();

  console.log(dataToInfer)
  return (
    <div className='bg-[#F5F5F5] p-6 flex flex-col justify-start w-[37.5%] h-[130vh] gap-6 no-scrollbar'>
      <div className='flex justify-between gap-5 items-center'>
        <h1 className='text-3xl font-bold'>Prompt</h1>
        <div>
        <select value={dataToInfer} onChange={handleChange}>
            <option value="age">Age</option>

            <option value="languageSkills">Language Skills EN</option>
            
            <option value="location">Location</option>

          </select>
      </div>
        
      </div>
      
      
      <PromptInput inferData={dataToInfer}/>
    

    </div>
  )
}

export default Prompt