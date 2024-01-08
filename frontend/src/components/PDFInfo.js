import React from 'react';
import axios from 'axios';
import { useCandidate } from '../context/Context';
const PDFInfo = ({id, first_name, last_name, position, active}) => {
  const { setCandidate,setOutput } = useCandidate();

  
  const handleClick = async () => {
    console.log(id)
    
    try {
      // Send a POST request to the Flask backend
      const response = await axios.post('/get_candidate', {
        candidateId: id, 
      });
      setCandidate(id);
      setOutput(response.data)

      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div className='p-3 flex justify-center items-center w-full gap-8 p=4 hover:bg-[#CECECE]'>
      <div className='rounded-full bg-[#D3D3D3] w-[10%] flex justify-center items-start p-2'>
        <img src={require('../img/pdf_icon.png')} alt='pdf-icon' className='w-[70%]'/>
      </div>

      <div className='w-[70%] flex flex-col gap-2 justify-items-start  '>
        <h3 className='font-bold'>{first_name} {last_name}</h3>
        <p className='text-[#919191]'>{position}</p>
        <button className='font-bold und  erline hover:cursor-pointer text-left' onClick={handleClick}>
          {active ? 'View' : 'Run'}
        </button>
      </div>
    </div>
  );
};

export default PDFInfo;
