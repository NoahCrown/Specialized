// Components
import Sidebar from "./components/Sidebar";
import Output from './components/Output'
import Prompt from "./components/Prompt";
import { useEffect, useState } from "react";
import axios from 'axios'


function App() {

  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    // Sample data to send in the POST request
    const postData = { id: 123, name: 'John' };

    // Make an Axios POST request to the Flask webhook
    axios.post('/webhook', postData)
      .then(response => {
        setResponseData(response.data);
        console.log(responseData)
      })
      .catch(error => {
        console.error('Error sending POST request:', error);
      });
  }, []);


  return (
    <div className="App flex bg-white items-center flex-row box-border overflow-auto">
      <Sidebar/>
      <Output/>
      <Prompt/>
    </div>
  );
}

export default App;
