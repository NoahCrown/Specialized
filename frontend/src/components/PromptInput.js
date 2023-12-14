import React, { useState } from 'react';

function PromptInput({ promptNumber, active, onClick }) {
  const [isTextboxVisible, setTextboxVisible] = useState(false);

  const toggleTextbox = () => {
    setTextboxVisible(!isTextboxVisible);
  };

  return (
    <div className="relative bg-white text-black">
      <div
        className={`cursor-pointer border-solid border-2 border-[#D1D5DB] px-10  p-4 gap-2 rounded text-black flex flex-row justify-between items-center ${
          active ? 'bg-blue-500 text-white' : ''
        }`}
        onClick={toggleTextbox}
      >
        <div className='rounded-full bg-[#CECECE] w-[8%] flex justify-center items-start p-2 '>
          <img src={require('../img/pdf_icon.png')} alt='pdf-icon' className='w-[60%]'/>
        </div>
        <input className='focus:outline-none' placeholder={`Enter name ${promptNumber} here`} />
        {isTextboxVisible ? (
          <i className="fa-solid fa-minus"></i>
        ) : (
          <i className="fa-solid fa-plus"></i>
        )}
      </div>
      {isTextboxVisible && (
        <div className="absolute left-0 mt-2 p-2 bg-white rounded text-black w-full">
          <textarea
            className="w-full h-[70vh] border border-gray-300 rounded p-2"
            placeholder={`Enter your prompt ${promptNumber}`}
          ></textarea>
        </div>
      )}
    </div>
  );
}

export default PromptInput;
