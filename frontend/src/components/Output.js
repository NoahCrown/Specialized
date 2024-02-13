import React, { useState } from "react";
import { useCandidate } from "../context/Context";
import Loader from "./Loader";
import axios from "axios";
import AnalyzerOutput from "./AnalyzerOutput";
import {toast } from 'react-toastify';
import ModalLoader from "./ModalLoader";

const Output = () => {
  const {
    promptResult,
    handleOpenPdfInNewTab,
    mode,
    setOutput,
    defaultBullhornData,
    setModeOfData,
    setDataLoader
  } = useCandidate();


  const [parsedBullhornData, setParsedBullhornData] = useState(null);
  const [showParsedData, setShowParsedData] = useState(false);
  console.log(parsedBullhornData)
  console.log(promptResult)


  const switchData = () => {
    setShowParsedData(!showParsedData);
    if (showParsedData){
      setOutput(parsedBullhornData)
      setModeOfData('CV')
    }else{
      setOutput(defaultBullhornData)
      setModeOfData('bullhorn')
    }
    
  };

  const parseBullhornData = async () => {
    setDataLoader(true)
    try {
      toast.success('Parsing bullhorn data.')

      // Send a POST request to the Flask backend
      const response = await axios.post("/extract_bullhorn", {
        candidateId: promptResult[0].id,
      });
      setParsedBullhornData(response.data);
      setDataLoader(false)

      toast.success('Successfully parsed bullhorn data.')
    } catch (error) {
      // Handle errors
      console.error("Error sending POST request:", error);
      setDataLoader(false)


    }
  };

  const handleShowPDF = async () => {
    try {
      // Send a POST request to the Flask backend
      const response = await axios.post("/get_pdf", {
        candidateId: promptResult[0].id,
        mode: mode,
      });
      const base64 = response.data.candidateFile;
      handleOpenPdfInNewTab(base64);
    } catch (error) {
      // Handle errors
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <div className=" overflow-scroll no-scrollbar w-[37.5%] bg-[#F5F5F5]  flex  p-6 flex-col gap-4 max-h-[140vh]  min-h-[140vh] border-r-2 border-solid border-[#D1D5DB]">
      <div className="mt-10">
        <div className="flex justify-between mb-5">
          <h1 className="text-3xl font-bold">Output</h1>
          {mode === "bullhorn" && !parsedBullhornData ? (
            <button
              className="border border-[#ababab] border-dashed text-[#ababab] bg-[#F5F5F5] w-1/4 rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer"
              onClick={parseBullhornData}
            >
              <i className="fa-solid fa-code"></i> Parse
            </button>
          ) : (
            <button
              className="border border-[#ababab] border-dashed text-[#ababab] bg-[#F5F5F5] w-1/4 rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer"
              onClick={switchData}
            >
              Toggle Data
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
