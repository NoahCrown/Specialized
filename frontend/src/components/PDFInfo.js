import React from 'react'

const PDFInfo = (props) => {
  return (
    <div className='p-3 flex justify-center items-center w-full gap-8 p=4 hover:bg-[#CECECE]'>
        <div className='rounded-full bg-[#D3D3D3] w-[10%] flex justify-center items-start p-2'>
            <img src={require('../img/pdf_icon.png')} alt='pdf-icon' className='w-[70%]'/>
        </div>

        <div className='w-[70%] flex flex-col gap-2 '>
            <h3 className='font-bold'>{props.name}</h3>
            <p className='text-[#919191]'>{props.position}</p>
            <buton className='font-bold underline hover:cursor-pointer'>{props.active ? 'View' : "Run"}</buton>
        </div>
    </div>
  )
}

export default PDFInfo