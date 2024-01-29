import React, { useState } from 'react';
import { useCandidate } from '../context/Context';

import PromptInput from './PromptInput';

const Prompt = () => {
  const { dataToInfer, handleChange } = useCandidate();
  const [promptInputs, setPromptInputs] = useState([]);

  const addPromptInput = () => {
    setPromptInputs([...promptInputs, <PromptInput/>]);
  };


  console.log(dataToInfer);

  return (
    <div className='bg-[#F5F5F5] p-6 flex flex-col justify-start w-[37.5%] gap-6 no-scrollbar overflow-scroll max-h-[140vh]  min-h-[140vh] '>
      <div className='mt-10 flex flex-col gap-6'>

      
      <div className='flex justify-between gap-5 items-center'>
        <h1 className='text-3xl font-bold'>Prompt</h1>
        <div>
          <select
            className='border border-solid border-black text-center'
            value={dataToInfer}
            onChange={handleChange}
            defaultValue="age"
          >
            <option value='age'>Age</option>
            <option value='languageSkills'>Language Skills EN</option>
            <option value='location'>Location</option>
          </select>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <button
          onClick={addPromptInput} // Call the addPrompt function when the button is clicked
          className='border border-[#ababab] border-dashed text-[#ababab] bg-[#F5F5F5] w-full rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer '
        >
         <i className='fa-solid fa-plus'></i> Add a new prompt 
        </button>
      </div>
      {promptInputs.map((prompt, index) => (
        <div key={prompt.key}>
          <PromptInput/>

        </div>
      ))}
      </div>
    </div>
  );
};

export default Prompt;
