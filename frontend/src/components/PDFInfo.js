import React from 'react';
import axios from 'axios';

const PDFInfo = ({id, name, position, active}) => {
  const handleClick = async () => {
    try {
      // Send a POST request to the Flask backend
      const response = await axios.post('enter-flask-endpoint', {
        candidateId: id, 
      });

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
        <h3 className='font-bold'>{name}</h3>
        <p className='text-[#919191]'>{position}</p>
        <button className='font-bold und  erline hover:cursor-pointer text-left' onClick={handleClick}>
          {active ? 'View' : 'Run'}
        </button>
      </div>
    </div>
  );
};

export default PDFInfo;
