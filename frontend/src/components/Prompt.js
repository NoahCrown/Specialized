import React, {useState} from 'react'
import { useCandidate } from '../context/Context';


import PromptInput from './PromptInput'
const Prompt = () => {
  const { dataToInfer, handleChange } = useCandidate();
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);


  const addPrompt = () => {
    const newPrompts = [...prompts, <PromptInput inferData={dataToInfer} key={prompts.length} />];
    setPrompts(newPrompts);
  };

  const deletePrompt = (index) => {
    const newPrompts = [...prompts];
    newPrompts.splice(index, 1);
    setPrompts(newPrompts);
  };

  const togglePrompt = (index) => {
    setSelectedPrompt(selectedPrompt === index ? null : index);
  };


  console.log(dataToInfer)
  return (
    <div className='bg-[#F5F5F5] p-6 flex flex-col justify-start w-[37.5%] h-[130vh] gap-6 no-scrollbar'>
      <div className='flex justify-between gap-5 items-center'>
        <h1 className='text-3xl font-bold'>Prompt</h1>
      <div>
      <select className='border border-solid border-black' value={dataToInfer} onChange={handleChange}>
            <option value="age">Age</option>

            <option value="languageSkills">Language Skills EN</option>
            
            <option value="location">Location</option>

        </select>
      </div>
        
      </div>
      <div className='flex justify-center items-center'> 
        <button         
        onClick={addPrompt}
        className='w-1/2 border border-black border-dashed text-black bg-[#F5F5F5] w- rounded-md px-[.8rem] py-[.4rem] hover:cursor-pointer '>Add a new prompt <i class="fa-solid fa-plus"></i></button>


      </div>

      
      
      {prompts.map((prompt, index) => (
        <div key={index}>
          {prompt}
          <button
            className='text-red-600 hover:text-red-800'
            onClick={() => deletePrompt(index)}
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  )
}

export default Prompt