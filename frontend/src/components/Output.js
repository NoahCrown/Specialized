import React, { useState } from "react";
import { useCandidate } from "../context/Context";
import axios from "axios";
import AnalyzerOutput from "./AnalyzerOutput";
import {toast } from 'react-toastify';

const Output = () => {
  const {
    promptResult,
    handleOpenPdfInNewTab,
    mode,
    setOutput,
    defaultBullhornData,
    setModeOfData,
    setDataLoader,
    setLoaderDetails,
    isNewData,
    setThisNewData
  } = useCandidate();


  const [parsedBullhornData, setParsedBullhornData] = useState(null);
  const [showParsedData, setShowParsedData] = useState(false);
  const [candidateId, setCandidateId] = useState(null)
  console.log(parsedBullhornData)
  console.log(promptResult)



  const switchData = () => {
    setShowParsedData(!showParsedData);
    if (showParsedData){
      setOutput(parsedBullhornData)
      setModeOfData('CV_bullhorn')
    }else{
      setOutput(defaultBullhornData)
      setModeOfData('bullhorn')
    }
    
  };

  const parseBullhornData = async () => {
    setLoaderDetails('Parsing')
    setDataLoader(true)
    try {
      toast.success('Parsing bullhorn data.')

      const response = await axios.post("/api/extract_bullhorn", {
        candidateId: promptResult[0].id,
      });
      setParsedBullhornData(response.data);
      setDataLoader(false)
      setThisNewData(false)
      setCandidateId(promptResult[0].id)
      toast.success('Successfully parsed bullhorn data.')
    } catch (error) {
      setDataLoader(false)
      toast.warn('Error: Resume format is not supported')


    }
  };

  const handleShowPDF = async () => {
    console.log(mode)
    console.log(promptResult[0].id)
    try {
      // Send a POST request to the Flask backend
      const response = await axios.post("/api/get_pdf", {
        candidateId:  promptResult[0].id || candidateId || null,
        mode: mode,
      });
      const base64 = response.data.candidateFile;
      handleOpenPdfInNewTab(base64);
    } catch (error) {
      // Handle errors
      console.error("Error sending POST request:", error);
      toast.warn("Error: CV format isn't supported")
    }
  };

  return (
    <div className=" overflow-scroll no-scrollbar w-[37.5%] bg-[#F5F5F5]  flex  p-6 flex-col gap-4 max-h-[145vh]  min-h-[145vh] border-r-2 border-solid border-[#D1D5DB]">
      <div className="mt-10">
        <div className="flex justify-between mb-5">
          <h1 className="text-3xl font-bold">Output</h1>
          {mode === "bullhorn" && isNewData ? (
            <button
              className="border border-[#ababab] border-dashed text-[#ababab] bg-[#F5F5F5] w-1/4 rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer"
              onClick={parseBullhornData}
            >
              <i className="fa-solid fa-code"></i> Parse
            </button>
          ) : (
          !isNewData &&  (mode === 'bullhorn' || mode === 'CV_bullhorn') &&
            <button
              className="border border-[#ababab] border-dashed text-[#ababab] bg-[#F5F5F5] w-1/4 rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer"
              onClick={switchData}
            >
              Switch Parser
            </button>
          )}
          <button
            onClick={handleShowPDF}
            className="border border-[#ababab] border-dashed text-[#ababab] bg-[#F5F5F5] w-1/4 rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer"
          >
            <i className="fa-regular fa-file-pdf"></i> View PDF
          </button>
        </div>
        {promptResult && promptResult.length > 0 ? (
            <AnalyzerOutput />
          ) : (
            <div className="w-full flex justify-center items-center flex-col min-h-[80vh]">
              <img
                src={require("../img/no-data.png")}
                alt="svg-no-data"
                className="w-1/3"
              />
              <p className="text-[#919191]">No data to show.</p>
              <p className="text-[#919191]">
                Upload or run CVs to load data.
              </p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Output;
