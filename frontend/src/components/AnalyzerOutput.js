import React from "react";
import { useCandidate } from "../context/Context";

const AnalyzerOutput = () => {
  const {
    promptResult,
    inferedData,
    inferedLangProficiency,
    inferedLocation,
    epochToDateString,
    mode
  } = useCandidate();

  console.log(inferedData)
  console.log(inferedLangProficiency)
  console.log(inferedLocation)
  return (
    <>
      <p className="text-[#919191] ">Resume information</p>
      <p className="text-[#919191] text-[.75rem]">{mode === "CV" || mode === "CV_bullhorn" ? 'Parsed with Offshorly parser' : 'Parsed with Bullhorn'}</p>
      {/* Personal Information  */}
      <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
        <p className="text-black py-2 font-semibold">Personal Information</p>
        <p className="w-1/4 inline-block">First Name:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {promptResult[0]?.properties?.firstName
            ? promptResult[0]?.properties?.firstName
            : promptResult[0]?.firstName || "N/A"}
        </span>
        <p className="w-1/4 inline-block">Last Name:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {promptResult[0]?.properties?.lastName
            ? promptResult[0]?.properties?.lastName
            : promptResult[0]?.lastName || "N/A"}
        </span>
        <p className="w-1/4 inline-block">Phone:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {promptResult[0]?.properties?.phone
            ? promptResult[0]?.properties?.phone
            : promptResult[0]?.phone || "N/A"}
        </span>
        <p className="w-1/4 inline-block">Address:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {promptResult[0]?.properties?.ethnicity
            ? promptResult[0]?.properties?.ethnicity
            : promptResult[0]?.ethnicity || "N/A"}
        </span>
        <p className="w-1/4 inline-block">Email:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {promptResult[0]?.properties?.email
            ? promptResult[0]?.properties?.email
            : promptResult[0]?.email || "N/A"}
        </span>
        <p className="w-1/4 inline-block">Ed. Degree:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {promptResult[0]?.properties?.educationDegree
            ? promptResult[0]?.properties?.educationDegree
            : promptResult[0]?.educationDegree || "N/A"}
        </span>
      </div>

      {/* Job History  */}
      <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
        <p className="text-black py-2 font-semibold">Job History</p>
        {Array.isArray(promptResult[1]?.workHistory)
          ? promptResult[1].workHistory.map((val, index) => (
              <div className="mb-4" key={index}>
                <p className="w-1/4 inline-block align-top">Company Name: </p>
                <span className="text-[#919191] w-3/4 inline-block">
                  {val.companyName || "N/A"}
                </span>
                <p className="w-1/4 inline-block">Job Title: </p>
                <span className="text-[#919191] w-3/4 inline-block">
                  {val.title || "N/A"}
                </span>
                <p className="w-1/4 inline-block">Start date: </p>
                <span className="text-[#919191] w-3/4 inline-block">
                  {val.startDate
                    ? isNaN(val.startDate)
                      ? val.startDate
                      : epochToDateString(val.startDate)
                    : "N/A"}
                </span>
                <p className="w-1/4 inline-block">End date: </p>
                <span className="text-[#919191] w-3/4 inline-block">
                  {val.endDate
                    ? isNaN(val.endDate)
                      ? val.endDate
                      : epochToDateString(val.endDate)
                    : "N/A"}
                </span>
                <p className="w-1/4 inline-block align-top">Comments: </p>
                <span className="text-[#919191] w-3/4 inline-block">
                  {val.comments}
                </span>
              </div>
            ))
          : Array.isArray(promptResult[1])
          ? promptResult[1].map((val, index) => (
              <div className="mb-4" key={index}>
                <p className="w-1/4 inline-block align-top">Company Name: </p>
                <span className="text-[#919191] w-3/4 inline-block">
                  {val.companyName || "N/A"}
                </span>
                <p className="w-1/4 inline-block">Job Title: </p>
                <span className="text-[#919191] w-3/4 inline-block">
                  {val.title || "N/A"}
                </span>
                <p className="w-1/4 inline-block">Start date: </p>
                <span className="text-[#919191] w-3/4 inline-block">
                  {val.startDate
                    ? isNaN(val.startDate)
                      ? val.startDate
                      : epochToDateString(val.startDate)
                    : "N/A"}
                </span>
                <p className="w-1/4 inline-block">End date: </p>
                <span className="text-[#919191] w-3/4 inline-block">
                  {val.endDate
                    ? isNaN(val.endDate)
                      ? val.endDate
                      : epochToDateString(val.endDate)
                    : "N/A"}
                </span>
                <p className="w-1/4 inline-block align-top">Comments: </p>
                <span className="text-[#919191] w-3/4 inline-block">
                  {val.comments || "N/A"}
                </span>
              </div>
            ))
          : "N/A"}
      </div>

      {/* Skills and Qualification */}
      <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
        <p className=" font-semibold py-2 ">Skills/Qualification</p>
        <div className="flex flex-wrap">
          <p className="w-1/4 inline-block align-top">Primary Skills:</p>
          <span className="text-[#919191] w-3/4 inline-block">
            <ul className="flex gap-x-8 flex-wrap">
            {promptResult[0].properties ? (
                Array.isArray(promptResult[0].properties.primarySkills[0].data) && promptResult[0].properties.primarySkills[0].data.map(
                  (val, index) => (
                    <li className="list-disc" key={index}>
                      {val.name || val}
                    </li>
                  )
                )
              ) : Array.isArray(promptResult[0].primarySkills?.[0]?.data) &&
                promptResult[0].primarySkills?.[0]?.data?.length > 0 ? (
                promptResult[0].primarySkills?.[0]?.data.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name || val}
                  </li>
                ))
              ) : Array.isArray(promptResult[0].primarySkills?.data)  && promptResult[0].primarySkills?.data?.length > 0 ? (
                promptResult[0].primarySkills?.data?.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name}
                  </li>
                ))
              ) : Array.isArray(promptResult[0]?.primarySkills) && promptResult[0]?.primarySkills.length > 0 ? (
                promptResult[0]?.primarySkills.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val}
                  </li>
                ))
              ) : (
                <p>N/A</p>
              )}  
            </ul>
          </span>
        </div>
        <div className="flex flex-wrap ">
          <p className="w-1/4 inline-block align-top	">Secondary Skills:</p>
          <span className="text-[#919191] w-3/4 inline-block">
            <ul className="flex gap-x-8 flex-wrap">
              {promptResult[0].properties ? (
                Array.isArray(promptResult[0].properties.secondarySkills[0].data) && promptResult[0].properties.secondarySkills[0].data.map(
                  (val, index) => (
                    <li className="list-disc" key={index}>
                      {val.name || val}
                    </li>
                  )
                )
              ) : Array.isArray(promptResult[0].secondarySkills?.[0]?.data) &&
                promptResult[0].secondarySkills?.[0]?.data.length > 0 ? (
                promptResult[0].secondarySkills?.[0]?.data.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name || val}
                  </li>
                ))
              ) : Array.isArray(promptResult[0]?.secondarySkills?.data)  && promptResult[0]?.secondarySkills?.data?.length > 0 ? (
                promptResult[0]?.secondarySkills?.data?.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name}
                  </li>
                ))
              ) : Array.isArray(promptResult[0]?.secondarySkills) &&  promptResult[0]?.secondarySkills.length > 0 ? (
                promptResult[0]?.secondarySkills.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val}
                  </li>
                ))
              ) : (
                <p>N/A</p>
              )}
            </ul>
          </span>
        </div>
        <div className="flex flex-wrap">
          <p className="w-1/4 inline-block align-top">Skill Set:</p>
          <span className="text-[#919191] w-3/4 inline-block">
            <ul className="flex gap-x-8 flex-wrap">
              {promptResult[0].properties ? (
                Array.isArray(promptResult[0].properties.skillSet[0].data) && promptResult[0].properties.skillSet[0].data.map(
                  (val, index) => (
                    <li className="list-disc" key={index}>
                      {val.name || val}
                    </li>
                  )
                )
              ) :Array.isArray(promptResult[0].skillSet?.[0]?.data)  &&
                promptResult[0].skillSet?.[0]?.data?.length > 0 ? (
                promptResult[0].skillSet?.[0]?.data.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name || val}
                  </li>
                ))
              ) :Array.isArray(promptResult[0].skillSet?.data)  && promptResult[0].skillSet?.data.length > 0 ? (
                promptResult[0].skillSet?.data?.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name}
                  </li>
                ))
              ) :Array.isArray(promptResult[0]?.skillSet)  && promptResult[0]?.skillSet.length > 0 ? (
                promptResult[0]?.skillSet.map((val, index) => (
                  <li className="list-disc" key={index}> 
                    {val}
                  </li>
                ))
              ) : (
                <p>N/A</p>
              )}
            </ul>
          </span>
        </div>
        <div className="flex flex-wrap	">
          <p className="w-1/4 inline-block align-top ">Certifications:</p>
          <span className="text-[#919191] w-3/4 inline-block">
            {promptResult[0]?.properties?.certifications
              ? promptResult[0].properties.certifications.map((val, i) => (
                  <ul key={i}>
                    <li className="list-disc">{val}</li>
                  </ul>
                ))
              : promptResult[0]?.certifications
              ? promptResult[0].certifications.map((val, i) => (
                  <ul key={i}>
                    <li className="list-disc">{val}</li>
                  </ul>
                ))
              : "N/A"}
          </span>
        </div>
        <div className="flex flex-wrap">
          <p className="w-1/4 inline-block align-top">Specialties:</p>
          <span className="text-[#919191] w-3/4 inline-block">
            <ul className="flex gap-x-8 flex-wrap">
              {promptResult[0].properties ? (
                Array.isArray(promptResult[0].properties.specialties?.[0].data) && promptResult[0].properties.specialties?.[0].data.map(
                  (val, index) => (
                    <li className="list-disc" key={index}>
                      {val.name || val}
                    </li>
                  )
                )
              ) : Array.isArray(promptResult[0].specialties?.[0]?.data)  &&
                promptResult[0].specialties?.[0]?.data.length > 0 ? (
                promptResult[0].specialties?.[0]?.data.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name || val}
                  </li>
                ))
              ) : Array.isArray(promptResult[0]?.specialties?.data) && promptResult[0]?.specialties?.data?.length > 0 ? (
                promptResult[0]?.specialties?.data?.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name}
                  </li>
                ))
              ) : Array.isArray(promptResult[0]?.specialties) && promptResult[0]?.specialties.length > 0 ? (
                promptResult[0]?.specialties.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val}
                  </li>
                ))
              ) : (
                <p>N/A</p>
              )}
            </ul>
          </span>
        </div>
        <div className="flex flex-wrap">
          <p className="w-1/4 inline-block align-top">Comments:</p>
          <span className="text-[#919191] w-3/4 inline-block">
            {promptResult[0]?.properties?.comments ? promptResult[0].properties?.comments : promptResult[0]?.comments  || "N/A"}
          </span>
        </div>
      </div>
      {inferedData && (
          <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
            <p className="font-semibold py-2">Inferred Age</p>
            <div className="flex flex-wrap items-center">
              <p className="w-1/4 inline-block">Inferred Age:</p>
              <span className="text-[#919191] w-3/4 inline-block">
                {inferedData?.properties?.Age || inferedData?.Age}
              </span>
            </div>
            <div className="flex flex-wrap items-center">
              <p className="w-1/4 inline-block">AI Confidence:</p>
              <span className="text-[#919191] w-3/4 inline-block">
                {inferedData?.properties?.confidence || inferedData?.confidence}
              </span>
            </div>
          </div>
        )
      }

      {inferedLangProficiency && (
  <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
    <p className="font-semibold py-2">Inferred Language Proficiency</p>
    {inferedLangProficiency?.properties ? (
      inferedLangProficiency?.properties?.languageSkills.map((val, index) => (
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
      ))
    ) : (
      inferedLangProficiency.languageSkills.map((val, index) => (
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
      ))
    )}
  </div>
)
          
      }

      {inferedLocation && (
          <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
            <p className="font-semibold py-2"> Inferred Location</p>
            <div className="flex flex-wrap items-center">
              <p className="w-1/4 inline-block">Location:</p>
              <span className="text-[#919191] w-3/4 inline-block">
                {inferedLocation?.properties?.Location || inferedLocation?.Location}
              </span>
            </div>
            <div className="flex flex-wrap items-center">
              <p className="w-1/4 inline-block">AI Confidence:</p>
              <span className="text-[#919191] w-3/4 inline-block">
                {inferedLocation?.properties?.confidence || inferedLocation?.confidence}
              </span>
            </div>
          </div>
      
      )}
    </>
  );
};

export default AnalyzerOutput;
