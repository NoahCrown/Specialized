import React, { createContext, useContext, useState } from 'react';

const Context = createContext();



export const CandidateProvider = ({ children }) => {
  const [candidateId, setCandidateId] = useState(null);


  const [promptResult, setPromptResult] = useState(null)

  const [dataToInfer, setDataToInfer] = useState('');

  const [inferedData, setInferedData] = useState(null)

  const handleChange = (event) => {
        setDataToInfer(event.target.value);
  };

  const setInfered = (data) => {
    setInferedData(data)
  }


  const setCandidate = (id) => {
    setCandidateId(id);
  };

  const setOutput = (data) => {
    setPromptResult(data)
  }

  return (
    <Context.Provider value={{ candidateId, setCandidate, promptResult, setPromptResult, setOutput, dataToInfer, handleChange, setInfered, inferedData}}>
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