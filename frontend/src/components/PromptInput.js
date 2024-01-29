import React, {useState } from 'react';
import axios from 'axios';
import { useCandidate } from '../context/Context';
import { toast } from 'react-toastify';


function PromptInput({ currentDataToInfer, currentMode, currentName }) {
  const [isTextboxVisible, setTextboxVisible] = useState(false);
  const [responseText, setResponseText] = useState(" ");
  const { candidateId, dataToInfer, setInfered, setInferedLang, setInferedLoc, mode  } = useCandidate();

 
  const handleSubmitPropmpt = async() => {
    const data = {response: responseText, candidateId:candidateId, dataToInfer: dataToInfer, mode:mode }
    console.log(data)
    toast.success(`Inferring ${data.dataToInfer}, please wait.`)

    // Make a POST request to your Flask backend using Axios
    await axios
    .post('/prompt_input', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      // Handle the response from your Flask backend here
      if (response.data && dataToInfer === "age"){
        setInfered(response.data)
        toast.success('Successfully inferred Age Data.')
      }else if (response.data && dataToInfer === "languageSkills"){
        setInferedLang(response.data)
        toast.success('Successfully inferred Language Proficiency Data.')

      }else if (response.data && dataToInfer === "location"){
        setInferedLoc(response.data)
        toast.success('Successfully inferred Location Data.')

      }
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error:', error);
      if (error.response) {
        toast.warn('Failed to infer data, please try again later.')
        // T
      } 
    });


  }

  return (
    <>

    
    <div className="relative bg-white text-black">
      <div
        onClick={() => setTextboxVisible(!isTextboxVisible)}
        className={`cursor-pointer border-solid border-2 border-[#D1D5DB] px-10  p-4 gap-2 rounded text-black flex flex-row justify-between items-center  : ''
        }`}
        
      >
        <div className='rounded-full bg-[#CECECE] w-[8%] flex justify-center items-start p-2 '>
          <img src={require('../img/pdf_icon.png')} alt='pdf-icon' className='w-[60%]'/>
        </div>
        <input className='focus:outline-none' placeholder={`${currentName} - ${currentMode} - ${currentDataToInfer}`} />
        {isTextboxVisible ? (
          <i className="fa-solid fa-minus"></i>
        ) : (
          <i className="fa-solid fa-plus"></i>
        )}
      </div>
      {isTextboxVisible && (
        <div className="relative left-0 mt-2 p-2 bg-white rounded text-black w-full">
          <textarea
          className="w-full h-[60vh] border border-gray-300 rounded p-2"
          placeholder={`Enter your prompt`}
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
        ></textarea>
        <div className='flex items-center justify-between px-4'>
        <p className='underline font-bold hover:cursor-pointer'>Save</p>
          <button
          className="my-3 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          onClick={handleSubmitPropmpt}
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
