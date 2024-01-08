import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CandidateProvider } from './context/Context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <CandidateProvider>
      <App />
    </CandidateProvider>
  </React.StrictMode>
);
