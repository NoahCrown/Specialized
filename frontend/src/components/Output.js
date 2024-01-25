import React, { useEffect } from 'react'
import { useCandidate } from '../context/Context';


const Output = () => {  
  const { promptResult, inferedData, inferedLangProficiency, inferedLocation } = useCandidate();
  useEffect(() => {
    console.log("PromptResult changed:", promptResult);
  }, [promptResult]);

  console.log(promptResult)
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
          <p>First Name:{promptResult[0].firstName} </p>
          <p>Last Name: {promptResult[0].lastName} </p>
          <p>Phone: {promptResult[0].phone || 'N/A'}</p>
          <p>Address:{promptResult[0].ethnicity || 'N/A'} </p>
          <p>Email: {promptResult[0].email}</p>
      </div>
      {/* Job History  */}
      <div className='text-[#919191] border-solid border-b-2 border-[#E7E7E7] w-full py-2'>
          <p className='text-black py-2'>Job History</p>
          <p>Company Name: {promptResult[1].companyName}</p>
          <p>Job Title: {promptResult[1].title}</p>
          <p>Comments: {promptResult[1].comments}</p>
          <p>Start date: {promptResult[1].startDate}</p>
          <p>End date: {promptResult[1].endDate}</p>

      </div>

      <div className='text-[#919191] border-solid border-b-2 border-[#E7E7E7] w-full py-2'>
          <p className='text-black py-2'>Skills/Qualification</p>
          <p>Primary Skills: {promptResult[0].primarySkills.data[0]?.name || promptResult[0].primarySkills?.data}</p>
          <p>Secondary Skills: {promptResult[0].secondarySkills.data[0]?.name || promptResult[0].secondarySkills?.data} </p>
          <p>Skill Set: {promptResult[0].skillSet}</p>
          <p>Certifications: {promptResult[0].certifications}</p>
  Specialties: 
  {promptResult.specialties?.data.length > 0 ? (
    promptResult.specialties?.data.map((val, index) => (
      <p key={index}>{val.name}</p>
    ))
  ) : (
    "N/A"
  )}


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
          {inferedLocation && <p>Inferred Location: {inferedLocation.Location}  </p>}
          {inferedLocation && <p>AI Confidence: {inferedLocation.confidence}  </p>}
      </div> 
      }
      
          </>
        
        
         : <h1>No Data</h1>}
        
        
    </div>
  )
}

export default Output