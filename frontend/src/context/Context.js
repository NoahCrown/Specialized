import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const CandidateProvider = ({ children }) => {

  // Data Context
  const [data, setData] = useState([])

  const setAllData = (data) => {
    setData(data)
  }

  // File Upload Context
  const [selectedFile, setSelectedFile] = useState(null);

  const setUploadFile = (file) => {
    setSelectedFile(file)
  }

  // Candidate ID Context
  const [candidateId, setCandidateId] = useState(null);

  const setCandidate = (id) => {
    setCandidateId(id);
  };

  // Output Display Context
  const [promptResult, setPromptResult] = useState(null)

  const setOutput = (data) => {
    setPromptResult(data)
  }

  // Select Data To Infer Context
  const [dataToInfer, setDataToInfer] = useState('');
  
  const handleChange = (event) => {
    setDataToInfer(event.target.value);
  };

  // Infered Age Data Context
  const [inferedData, setInferedData] = useState(null)

  const setInfered = (data) => {
    setInferedData(data)
  }

  // Infered Language Proficiency Context
  const [inferedLangProficiency, setInferedLangProficiency] = useState(null)
  
  const setInferedLang = (data) => {
    setInferedLangProficiency(data)
  }


  // Infered Location Data Context
  const [inferedLocation, setInferedLocation] = useState(null)

  const setInferedLoc = (data) => {
    setInferedLocation(data)
  }


  // Mode of Data Context
  const [mode, setMode] = useState(null)
  const setModeOfData = (data) => {
    setMode(data)
  }

  // Search bar Context
  const [inputValue, setInputValue] = useState("");
  const setSearch = (data) => {
    setInputValue(data)
  }

  // Search Result Context
  const [searchResults, setSearchResults] = useState([]);
  const setSearchData = (data) => {
    setSearchResults(data)
  }


  return (
    <Context.Provider value={{ 
      candidateId, 
      setCandidate, 
      promptResult, 
      setPromptResult, 
      setOutput, 
      dataToInfer, 
      handleChange, 
      setInfered, 
      inferedData, 
      inferedLangProficiency, 
      setInferedLang,
      inferedLocation,
      setInferedLoc,
      mode,
      setModeOfData,
      data,
      setAllData,
      selectedFile,
      setUploadFile}}>
      {children}
    </Context.Provider>
  );
};

export const useCandidate = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useCandidate must be used within a CandidateProvider');
    }
    return context;
  };