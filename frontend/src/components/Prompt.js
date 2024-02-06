import React, { useState, useEffect } from 'react';
import { useCandidate } from '../context/Context';
import axios from 'axios';

import PromptInput from './PromptInput';

const Prompt = () => {
  const {
    dataToInfer,
    setDataInfer,
    savedPrompts,
    setAgePromptInputs,
    setLanguagePromptInputs,
    setLocationPromptInputs,
    agePrompts,
    languagePrompts,
    locationPrompts,
    setSavedPromptsData, 
  } = useCandidate();

  const [promptInputs, setPromptInputs] = useState([]);
  console.log(savedPrompts);

  useEffect(() => {
    const fetchPromptData = async () => {
      try {
        const response = await axios.post('/load_prompt', {
          dataToInfer: null,
        });
    
        if (response.data) {
          await setSavedPromptsData(response.data);
          
        }
      } catch (error) {
        console.error('Error sending POST request:', error);
      }
    };
  
    fetchPromptData();
  }, []);

  useEffect(() => {
    const loadSavedPrompts = async() => {
      for (let i = 1; i <= savedPrompts[dataToInfer]; i++) {
        try {
          const response = await axios.post(`/get_prompt/${i}`, {
            dataToInfer: dataToInfer,
          });

          if (dataToInfer === 'age') {
            setAgePromptInputs([...agePrompts, <PromptInput id={i} key={i} prompt={response.data.prompt}/> ])
          } else if (dataToInfer === 'languageSkills') {
            setLanguagePromptInputs([...languagePrompts, <PromptInput id={i} key={i} prompt={response.data.prompt}/> ])
          } else if (dataToInfer === 'location') {
            setLocationPromptInputs([...locationPrompts, <PromptInput id={i} key={i} prompt={response.data.prompt}/> ])
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    loadSavedPrompts()
  },[dataToInfer])
  

  

  const handleOnChange = async (event) => {
    const val = event.target.value;
    setDataInfer(val);

  };

  const addPromptInput = () => {
    if (dataToInfer === "age"){
      setAgePromptInputs([...agePrompts, <PromptInput/>])
    }else if(dataToInfer === "languageSkills"){
      setLanguagePromptInputs([...languagePrompts, <PromptInput/>])
    }else if (dataToInfer === 'location')
      setLocationPromptInputs([...locationPrompts, <PromptInput />]);
  };

  return (
    <div className='bg-[#F5F5F5] p-6 flex flex-col justify-start w-[37.5%] gap-6 no-scrollbar overflow-scroll max-h-[140vh]  min-h-[140vh] '>
      <div className='mt-10 flex flex-col gap-6'>
        <div className='flex justify-between gap-5 items-center'>
          <h1 className='text-3xl font-bold'>Prompt</h1>
          <div>
            <select
              className='border border-solid border-black text-center'
              value={dataToInfer}
              defaultValue='age'
              onChange={handleOnChange}
            >
              <option value='age'>Age</option>
              <option value='languageSkills'>Language Skills EN</option>
              <option value='location'>Location</option>
            </select>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <button
            onClick={addPromptInput}
            className='border border-[#ababab] border-dashed text-[#ababab] bg-[#F5F5F5] w-full rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer'
          >
            <i className='fa-solid fa-plus'></i> Add a new prompt
          </button>
        </div>
        <div>
          {dataToInfer === 'age' &&
            agePrompts.map((prompt, index) => <div key={index}>{prompt}</div>)}
          {dataToInfer === 'languageSkills' &&
            languagePrompts.map((prompt, index) => <div key={index}>{prompt}</div>)}
          {dataToInfer === 'location' &&
            locationPrompts.map((prompt, index) => <div key={index}>{prompt}</div>)}
        </div>
      </div>
    </div>
  );
};

export default Prompt;
