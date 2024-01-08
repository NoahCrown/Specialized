import React, { createContext, useContext, useState } from 'react';

const Context = createContext();



export const CandidateProvider = ({ children }) => {
  const [candidateId, setCandidateId] = useState(null);
  // const [promptResult, setPromptResult] = useState({
  //   personal_info:{
  //     'first_name': '',
  //     'last_name':'',
  //     'phone_num':'',
  //     'address':''
  // },
  // job_history:{
  //     'position':'',
  //     'summary':'',
  // },
  // certificates:{
  //     'title':'',
  //     'website':'',
  // },
  // education:{
  //     'university':'',
  //     'year_graduated':'',
  //     'course':''
  // }
  // })

  const [promptResult, setPromptResult] = useState(null)

  const setCandidate = (id) => {
    setCandidateId(id);
  };

  const setOutput = (data) => {
    setPromptResult(data)
  }

  return (
    <Context.Provider value={{ candidateId, setCandidate, promptResult, setPromptResult, setOutput }}>
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