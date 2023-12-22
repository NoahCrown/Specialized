import React, { useEffect } from 'react'
import WorkDescription from './WorkDescription'
import { useCandidate } from '../context/Context';


const Output = () => {
  const { promptResult } = useCandidate();
  useEffect(() => {
    console.log("PromptResult changed:", promptResult);
  }, [promptResult]);
  
  return (
    <div className=' no-scrollbar w-[37.5%] bg-[#F5F5F5] flex  p-6 flex-col gap-4 overflow-scroll h-[105vh] border-r-2 border-solid border-[#D1D5DB]'>
        <h1 className='text-3xl font-bold'>Output</h1>
        <p className='text-[#919191]'>Resume information</p>
        {/* Personal Information  */}
        <div className='text-[#919191]'>
            <p className='text-black py-2'>Personal Information</p>
            <p>First Name: {promptResult.personal_info.first_name}</p>
            <p>Last Name: {promptResult.personal_info.last_name}</p>
            <p>Phone: {promptResult.personal_info.phone_num}</p>
            <p>Address: {promptResult.personal_info.address.street} {promptResult.personal_info.address.city} {promptResult.personal_info.address.country}</p>
        </div>
        {/* Job History  */}
        <div className='text-[#919191]'>
            <p className='text-black py-2'>Job History</p>
            {/* {promptResult.job_history.map((val) =>{
              <p>{val}</p>
            })}
             */}
        </div>
    </div>
  )
}

export default Output