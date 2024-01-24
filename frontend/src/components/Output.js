import React, { useEffect } from 'react'
import { useCandidate } from '../context/Context';


const Output = () => {  
  const { promptResult, inferedData, inferedLangProficiency, inferedLocation } = useCandidate();
  useEffect(() => {
    console.log("PromptResult changed:", promptResult);
  }, [promptResult]);

  console.log(promptResult)
  
  return (
    <div className=' no-scrollbar w-[37.5%] bg-[#F5F5F5]  flex  p-6 flex-col gap-4 overflow-scroll min-h-[140vh] border-r-2 border-solid border-[#D1D5DB]'>
        {promptResult !== null ? 
          <>
          <h1 className='text-3xl font-bold'>Output</h1>
      
      <p className='text-[#919191] '>Resume information</p>
      {/* Personal Information  */}
      <div className='text-[#919191] border-solid border-b-2 border-[#E7E7E7] w-full py-2'>
          <p className='text-black py-2'>Personal Information</p>
          <p>First Name:{promptResult.firstName} </p>
          <p>Last Name: {promptResult.lastName} </p>
          <p>Phone: {promptResult.phone || 'N/A'}</p>
          <p>Address:{promptResult.ethnicity || 'N/A'} </p>
      </div>
      {/* Job History  */}
      <div className='text-[#919191] border-solid border-b-2 border-[#E7E7E7] w-full py-2'>
          <p className='text-black py-2'>Job History</p>
          {/* {promptResult.job_history.map((val) =>{
            <p>{val}</p>
          })}
           */}
      </div>

      <div className='text-[#919191] border-solid border-b-2 border-[#E7E7E7] w-full py-2'>
          <p className='text-black py-2'>Skills/Qualification</p>
          <p>Primary Skills: {promptResult.primarySkills.data[0].name}</p>
          <p>Specialties: {promptResult.specialties.data.map((val, index) => (
            <p key={index}>{val.name}</p>
          ))}</p>

          <p>Comments: {promptResult.comments}</p>
      </div>
      
      {inferedData &&
        <div className='text-[#919191] border-solid border-b-2 border-[#E7E7E7] w-full py-2'>
          <p className='text-black py-2'>Age/Inferred Age</p>
          {inferedData && <p>Inferred Age: {inferedData.Age}  </p>}
          {inferedData && <p>AI Confidence: {inferedData.confidence}  </p>}
        </div>
      }
      
      {inferedLangProficiency && 
        <div className='text-[#919191] border-solid border-b-2 border-[#E7E7E7] w-full py-2'>
          <p className='text-black py-2'>Language Proficiency</p>
          {inferedLangProficiency && inferedLangProficiency.map((val, index) => (
        // Check if the data exists before rendering
          <div className='mb-2' key={index}>
            <p>Language: {val.Language}</p>
            <p>Confidence: {val.confidence}</p>
            <p>Proficiency: {val.enProficiency}</p>
          </div>
          ))}
        </div>
      }
      
      {inferedLocation &&
        <div className='text-[#919191] border-solid border-b-2 border-[#E7E7E7] w-full py-2'>
          <p className='text-black py-2'>Location</p>
          {inferedLocation && <p>Inferred Location: {inferedLocation.location}  </p>}
          {inferedLocation && <p>AI Confidence: {inferedLocation.confidence}  </p>}
      </div> 
      }
      
          </>
        
        
         : <h1>No Data</h1>}
        
        
    </div>
  )
}

export default Output