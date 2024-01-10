import React from 'react'
import { useCandidate } from '../context/Context';


import PromptInput from './PromptInput'
const Prompt = ({data}) => {
  const { dataToInfer, handleChange } = useCandidate();
  // const [dataToInfer, setDataToInfer] = useState('');

  //   const handleChange = (event) => {
  //       setDataToInfer(event.target.value);
  //   };


  console.log(dataToInfer)
  return (
    <div className='bg-[#F5F5F5] p-6 flex flex-col justify-start w-[37.5%] h-[105vh] gap-6 no-scrollbar'>
      <div className='flex justify-between gap-5 items-center'>
        <h1 className='text-3xl font-bold'>Prompt</h1>
        <div>
        <select value={dataToInfer} onChange={handleChange}>
            <option value="age">Age</option>

            <option value="language_skill">Language Skills EN</option>
            
            <option value="location">Location</option>

          </select>
      </div>
        
      </div>
      
      
      <PromptInput data={data} inferData={dataToInfer}/>
    

    </div>
  )
}

export default Prompt