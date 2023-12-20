import React from 'react'
import PDFInfo from './PDFInfo'

const Sidebar = ({data}) => {
  return (
    <div className='flex justify-center items-center w-1/4 flex-col h-[105vh]'>
    {/* Specialized Nav */}
        <div className='border-solid border-b-2 border-[#E7E7E7] w-full px-2 py-2'>
            <img src={require('../img/specialized_icon.png')} alt='specialized-icon' className='w-1/2 '/>
        </div>
    {/* Pdf Info */}
        <div className='flex justify-center items-center flex-col p-3 w-[80%] px-4 border-solid border-b-2 border-[#E7E7E7] '>
            <div className='border-solid border-2 border-[#E7E7E7] p-3 flex justify-center items-center w-full gap-8 p=4'>
                <div className='rounded-full bg-[#CECECE] w-[15%] flex justify-center items-start p-2'>
                    <img src={require('../img/pdf_icon.png')} alt='pdf-icon' className='w-[70%]'/>
                </div>

                <div className='w-[70%] flex flex-col gap-2 '>
                    <h3 className='font-bold'>Micah Angeles</h3>
                    <p className='text-[#919191]'>Creative Lead</p>
                    <buton className='font-bold underline hover:cursor-pointer'>View</buton>
                </div>
            </div>
        </div>
    {/* Search Bar  */}
        <div className='flex justify-center items-center flex-col gap-2 w-[80%] py-4'>
            <div className='border-solid border-2 border-[#E7E7E7] w-full flex flex-row justify-between items-center gap-4 p-2'>
                <input className='w-[90%] text-sm focus:outline-none' placeholder='Search for a job position or name... '/>
                <i class="fa-solid fa-x w-[10%] hover:cursor-pointer" ></i>
            </div>
            <button className='bg-black text-white w-full rounded-md p-2 hover:cursor-pointer '>Search</button>
        </div>
    {/* Results  */}
        <div className='w-full '>
            <p className='px-10'>Results</p>
            {data.slice(0, 3).map((val) => (    
                <PDFInfo name={val.fullname} position={val.job_history['job position']} />
            ))}
        </div>
        

    </div>
  )
}

export default Sidebar