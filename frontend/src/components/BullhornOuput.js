import React from 'react'
import { useCandidate } from "../context/Context";
import Loader from "./Loader";



const BullhornOuput = () => {
    const {
        promptResult,
        inferedData,
        inferedLangProficiency,
        inferedLocation,
        isLoadingInferredAge,
        isLoadingInferredLangProf,
        isLoadingInferredLoc,
        epochToDateString
      } = useCandidate();

      
  return (
    <>
    <p className="text-[#919191] ">Resume information</p>
    {/* Personal Information  */}
    <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
      <p className="text-black py-2 font-semibold">
        Personal Information
      </p>
      <p className="w-1/4 inline-block">First Name:</p>
      <span className="text-[#919191] w-3/4 inline-block">
        {/* {promptResult[0].firstName || "N/A"} */}
      </span>
      <p className="w-1/4 inline-block">Last Name:</p>
      <span className="text-[#919191] w-3/4 inline-block">
        {/* {promptResult[0].lastName || "N/A"} */}
      </span>
      <p className="w-1/4 inline-block">Phone:</p>
      <span className="text-[#919191] w-3/4 inline-block">
        {/* {promptResult[0].phone || "N/A"} */}
      </span>
      <p className="w-1/4 inline-block">Address:</p>
      <span className="text-[#919191] w-3/4 inline-block">
        {/* {promptResult[0].ethnicity || "N/A"} */}
      </span>
      <p className="w-1/4 inline-block">Email:</p>
      <span className="text-[#919191] w-3/4 inline-block">
        {/* {promptResult[0].email || "N/A"} */}
      </span>
      <p className="w-1/4 inline-block">Ed. Degree:</p>
      <span className="text-[#919191] w-3/4 inline-block">
        {/* {promptResult[0].educationDegree || "N/A"} */}
      </span>
    </div>

    {/* Job History  */}
    <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
      <p className="text-black py-2 font-semibold">Job History</p>
      {/* {promptResult[1].workHistory ? promptResult[1].workHistory.map((val, index) => (
        <div className='mb-4'>
        <p className="w-1/4 inline-block">Company Name: </p>
        <span className="text-[#919191] w-3/4 inline-block">
        {val.companyName || "N/A"}
      </span>
      <p className="w-1/4 inline-block">Job Title: </p>
      <span className="text-[#919191] w-3/4 inline-block">
        {val.title || "N/A"}
      </span>
      <p className="w-1/4 inline-block">Start date: </p>
      <span className="text-[#919191] w-3/4 inline-block">
      {val.startDate ? (
    isNaN(val.startDate) ? (val.startDate) : (epochToDateString(val.startDate))
) : "N/A"}

      </span>
      <p className="w-1/4 inline-block">End date: </p>
      <span className="text-[#919191] w-3/4 inline-block">
      {val.endDate ? (
    isNaN(val.endDate) ? (val.endDate) : (epochToDateString(val.endDate))
) : "N/A"}



      </span>

      <p className="w-1/4 inline-block h-full">Comments: </p>
      <span className="text-[#919191] w-3/4 inline-block">
        {val.comments}
      </span>

        </div>
      )) : "N/A" } */}
      
    </div>

    {/* Skills and Qualification */}
    <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
      <p className=" font-semibold py-2">Skills/Qualification</p>
      <div className="flex flex-wrap items-center">
        <p className="w-1/4 inline-block">Primary Skills:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          <ul className="flex gap-x-8 flex-wrap">
              {promptResult[0].primarySkills[0].data
  ? promptResult[0].primarySkills[0].data.map((val, i) => (
    <li className="list-disc" key={i}>
                    {val}
                  </li>
  ))
  : promptResult[0].primarySkills.map((val, i) => (
    <li className="list-disc" key={i}>
                    {val}
                  </li>
  ))}

              
          </ul>
        </span>
      </div>
      <div className="flex flex-wrap items-center">
        <p className="w-1/4 inline-block">Secondary Skills:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          <ul className="flex gap-x-8 flex-wrap">
            {/* {promptResult[0].secondarySkills
              ? promptResult[0].secondarySkills.map((val, i) => (
                  <li className="list-disc" key={i}>
                    {val}
                  </li>
                ))
              : "N/A"} */}
          </ul>
        </span>
      </div>
      <div className="flex flex-wrap items-center">
        <p className="w-1/4 inline-block">Skill Set:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          <ul className="flex gap-x-8 flex-wrap">
            {/* {promptResult[0].skillSet
              ? promptResult[0].skillSet.map((val, i) => (
                  <li className="list-disc" key={i}>
                    {val}
                  </li>
                ))
              : "N/A"} */}
          </ul>
        </span>
      </div>
      <div className="flex flex-wrap items-center">
        <p className="w-1/4 inline-block">Certifications:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {/* {promptResult[0].certifications.map((val, i) => (
            <ul>
              <li key={i} className="list-disc">
                {val}
              </li>
            </ul>
          )) || "N/A"} */}
        </span>
      </div>
      <div className="flex flex-wrap items-center">
        <p className="w-1/4 inline-block">Specialties:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          <ul className="flex gap-x-8 flex-wrap">
            {/* {promptResult[0].specialties
              ? promptResult[0].specialties.map((val, i) => (
                  <li className="list-disc" key={i}>
                    {val}
                  </li>
                ))
              : "N/A"} */}
          </ul>
        </span>
      </div>
      <div className="flex flex-wrap items-center">
        <p className="w-1/4 inline-block">Comments:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {/* {promptResult.comments || "N/A"} */}
        </span>
      </div>
    </div>
    {isLoadingInferredAge ? (
      <Loader />
    ) : (
      inferedData && (
        <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
          <p className="font-semibold py-2">Inferred Age</p>
          <div className="flex flex-wrap items-center">
            <p className="w-1/4 inline-block">Inferred Age:</p>
            <span className="text-[#919191] w-3/4 inline-block">
              {inferedData.Age}
            </span>
          </div>
          <div className="flex flex-wrap items-center">
            <p className="w-1/4 inline-block">AI Confidence:</p>
            <span className="text-[#919191] w-3/4 inline-block">
              {inferedData.confidence}
            </span>
          </div>
        </div>
      )
    )}

    {isLoadingInferredLangProf ? (
      <Loader />
    ) : (
      inferedLangProficiency && (
        <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
          <p className="font-semibold py-2">
            Inferred Language Proficiency
          </p>
          {inferedLangProficiency.map((val, index) => (
            <div className="mb-2" key={index}>
              <div className="flex flex-wrap items-center">
                <p className="w-1/4 inline-block">Language:</p>
                <span className="text-[#919191] w-3/4 inline-block">
                  {val.Language}
                </span>
              </div>
              <div className="flex flex-wrap items-center">
                <p className="w-1/4 inline-block">Confidence:</p>
                <span className="text-[#919191] w-3/4 inline-block">
                  {val.confidence}
                </span>
              </div>
              <div className="flex flex-wrap items-center">
                <p className="w-1/4 inline-block">Proficiency:</p>
                <span className="text-[#919191] w-3/4 inline-block">
                  {val.enProficiency || val.jpProficiency}
                </span>
              </div>
            </div>
          ))}
        </div>
      )
    )}

    {isLoadingInferredLoc ? (
      <Loader />
    ) : (
      inferedLocation && (
        <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
          <p className="font-semibold py-2"> Inferred Location</p>
          <div className="flex flex-wrap items-center">
            <p className="w-1/4 inline-block">Location:</p>
            <span className="text-[#919191] w-3/4 inline-block">
              {inferedLocation.Location}
            </span>
          </div>
          <div className="flex flex-wrap items-center">
            <p className="w-1/4 inline-block">AI Confidence:</p>
            <span className="text-[#919191] w-3/4 inline-block">
              {inferedLocation.confidence}
            </span>
          </div>
        </div>
      )
    )}
    </>
  )
}

export default BullhornOuput
