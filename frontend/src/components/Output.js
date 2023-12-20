import React from 'react'
import WorkDescription from './WorkDescription'

const Output = () => {
  return (
    <div className=' no-scrollbar w-[37.5%] bg-[#F5F5F5] flex  p-6 flex-col gap-4 overflow-scroll h-[105vh] border-r-2 border-solid border-[#D1D5DB]'>
        <h1 className='text-3xl font-bold'>Output</h1>
        <p className='text-[#919191]'>Resume information</p>
        {/* Personal Information  */}
        <div className='text-[#919191]'>
            <p className='text-black py-2'>Personal Information</p>
            <p>First Name: Micah</p>
            <p>Last Name: Angeles</p>
            <p>Phone: 09XXXXXXXX</p>
            <p>Address: Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522</p>
        </div>
        {/* Job History  */}
        <div className='text-[#919191]'>
            <p className='text-black py-2'>Job History</p>
            <WorkDescription
                position='Senior Graphic Designer | ABC Design Studio, City, State | [Month/Year] - [Month/Year]'
                achievements={['Conceptualized and designed visual materials for diverse projects, including branding, marketing collateral, and digital campaigns.',
                                'Mentored junior designers, fostering a collaborative and creative work environment.',
                                'Received recognition for outstanding design work in industry publications.']}
            />
            <WorkDescription 
            position='Creative Lead | XYZ Agency, City, State | [Month/Year] - Present'
            achievements={['Led a creative team in developing and executing innovative design concepts for various clients, resulting in a 20% increase in client satisfaction.',
                           'Collaborated with clients to understand their brand vision and developed creative strategies to meet their objectives.',
                            'Spearheaded the redesign of the company website, resulting in a 30% increase in user engagement.']} />
            
            
        </div>
    </div>
  )
}

export default Output