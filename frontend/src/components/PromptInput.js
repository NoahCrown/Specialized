import React, { useState } from 'react';
import axios from 'axios';

function PromptInput({ promptNumber, active, onClick }) {
  const [isTextboxVisible, setTextboxVisible] = useState(false);
  const [responseText, setResponseText] = useState('');

  
  const toggleTextbox = () => {
    setTextboxVisible(!isTextboxVisible);
  };

  const handleResponseSubmit = () => {
    // Create a JSON object with the response text
    const data = { response: responseText };

    // Make a POST request to your Flask backend using Axios
    axios
      .post('/prompt_input', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Handle the response from your Flask backend here
        console.log('Response from Flask:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };



  return (
    <>

    
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
          className="w-full h-[60vh] border border-gray-300 rounded p-2"
          placeholder={`Enter your prompt`}
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
        ></textarea>
        <div className='flex items-center justify-center'>
          <button
          className="my-3 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          onClick={handleResponseSubmit}
        >
          Rerun
        </button>
        </div>
        
        </div>
      )}

      
    </div>

    </>
  );
}

export default PromptInput;
