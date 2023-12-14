import React from 'react'

const WorkDescription = (props) => {
  return (
    <div>
        <p>{props.position}</p>
            <div className='indent-2 mb-4'>
                <ul className='flex flex-col list-disc list-inside'>
                    {props.achievements.map((val => (
                        <li className='' key={val}>{val}</li>
                    )))}

                </ul>

            </div>
    </div>
  )
}

export default WorkDescription