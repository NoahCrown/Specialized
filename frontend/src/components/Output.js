import React, { } from "react";
import { useCandidate } from "../context/Context";
import Loader from "./Loader";
import axios from 'axios';



const Output = () => {
  const {
    promptResult,
    inferedData,
    inferedLangProficiency,
    inferedLocation,
    isLoading,
    isLoadingInferredAge,
    isLoadingInferredLangProf,
    isLoadingInferredLoc,
    handleOpenPdfInNewTab,
    mode
  } = useCandidate();

  console.log(promptResult);

  const handleShowPDF = async () => {

  
    try {
      // Send a POST request to the Flask backend
      const response = await axios.post('/get_pdf', {
        candidateId: promptResult[0].id,
        mode: mode
      });
      console.log(response.data.candidateFile)
      const base64 = response.data.candidateFile
      handleOpenPdfInNewTab(base64)

    
    } catch (error) {
      // Handle errors
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div className=" overflow-scroll no-scrollbar w-[37.5%] bg-[#F5F5F5]  flex  p-6 flex-col gap-4 max-h-[140vh]  min-h-[140vh] border-r-2 border-solid border-[#D1D5DB]">
      {isLoading ? (
        <Loader />
      ) : promptResult !== null ? (
        <div className="mt-10  ">
          <div className="flex justify-between mb-5">
          <h1 className="text-3xl font-bold">Output</h1>
          <button onClick={handleShowPDF} className="border border-[#ababab] border-dashed text-[#ababab] bg-[#F5F5F5] w-1/4 rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer"><i class="fa-regular fa-file-pdf"></i> View PDF</button>
          </div>

          <p className="text-[#919191] ">Resume information</p>
          {/* Personal Information  */}
          <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
            <p className="text-black py-2 font-semibold">
              Personal Information
            </p>
            <p className="w-1/4 inline-block">First Name:</p>
            <span className="text-[#919191] w-3/4 inline-block">
              {promptResult[0].firstName || "N/A"}
            </span>
            <p className="w-1/4 inline-block">Last Name:</p>
            <span className="text-[#919191] w-3/4 inline-block">
              {promptResult[0].lastName || "N/A"}
            </span>
            <p className="w-1/4 inline-block">Phone:</p>
            <span className="text-[#919191] w-3/4 inline-block">
              {promptResult[0].phone || "N/A"}
            </span>
            <p className="w-1/4 inline-block">Address:</p>
            <span className="text-[#919191] w-3/4 inline-block">
              {promptResult[0].ethnicity || "N/A"}
            </span>
            <p className="w-1/4 inline-block">Email:</p>
            <span className="text-[#919191] w-3/4 inline-block">
              {promptResult[0].email || "N/A"}
            </span>
          </div>

          {/* Job History  */}
          <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
            <p className="text-black py-2 font-semibold">Job History</p>
            <p className="w-1/4 inline-block">Company Name: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {promptResult[1].companyName || "N/A"}
            </span>
            <p className="w-1/4 inline-block">Job Title: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {promptResult[1].title || "N/A"}
            </span>
            <p className="w-1/4 inline-block">Start date: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {promptResult[1].startDate || "N/A"}
            </span>
            <p className="w-1/4 inline-block">End date: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {promptResult[1].endDate || "N/A"}
            </span>
            <p className="w-1/4 inline-block">Comments: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {promptResult[1].comments || "N/A"}
            </span>
          </div>

          {/* Skills and Qualification */}
          <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
            <p className=" font-semibold py-2">Skills/Qualification</p>
            <div className="flex flex-wrap items-center">
              <p className="w-1/4 inline-block">Primary Skills:</p>
              <span className="text-[#919191] w-3/4 inline-block">
                {promptResult[0].primarySkills.data[0]?.name ||
                  promptResult[0].primarySkills?.data ||
                  "N/A"}
              </span>
            </div>
            <div className="flex flex-wrap items-center">
              <p className="w-1/4 inline-block">Secondary Skills:</p>
              <span className="text-[#919191] w-3/4 inline-block">
                {promptResult[0].secondarySkills.data[0]?.name ||
                  promptResult[0].secondarySkills?.data ||
                  "N/A"}
              </span>
            </div>
            <div className="flex flex-wrap items-center">
              <p className="w-1/4 inline-block">Skill Set:</p>
              <span className="text-[#919191] w-3/4 inline-block">
                {promptResult[0].skillSet || "N/A"}
              </span>
            </div>
            <div className="flex flex-wrap items-center">
              <p className="w-1/4 inline-block">Certifications:</p>
              <span className="text-[#919191] w-3/4 inline-block">
                {promptResult[0].certifications || "N/A"}
              </span>
            </div>
            <div className="flex flex-wrap items-center">
              <p className="w-1/4 inline-block">Specialties:</p>
              <span className="text-[#919191] w-3/4 inline-block">
                {promptResult.specialties?.data.length > 0
                  ? promptResult.specialties?.data.map((val, index) => (
                      <p key={index}>{val.name}</p>
                    ))
                  : "N/A"}
              </span>
            </div>
            <div className="flex flex-wrap items-center">
              <p className="w-1/4 inline-block">Comments:</p>
              <span className="text-[#919191] w-3/4 inline-block">
                {promptResult.comments || "N/A"}
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
        </div>
      ) : (
        <div className="w-full flex justify-center items-center flex-col min-h-[80vh]">
          <img
            src={require("../img/no-data.png")}
            alt="svg-no-data"
            className="w-1/3"
          />
          <p className="text-[#919191]">No data to show.</p>
          <p className="text-[#919191]">Upload or run CVs to load data.</p>
        </div>
      )}
    </div>
  );
};

export default Output;
