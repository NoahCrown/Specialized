// Components
import Sidebar from "./components/Sidebar";
import Output from './components/Output'
import Prompt from "./components/Prompt";
import { useEffect, useState } from "react";
import axios from 'axios'


function App() {

  const [data, setData] = useState([])

  // useEffect(() => {
  //   // Sample data to send in the POST request
  //   const postData = { id: 123, name: 'John' };

  //   // Make an Axios POST request to the Flask webhook
  //   axios.post('/webhook', postData)
  //     .then(response => {
  //       setResponseData(response.data);
  //       console.log(responseData)
  //     })
  //     .catch(error => {
  //       console.error('Error sending POST request:', error);
  //     });
  // }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/process_data');
        setData(response.data);
        console.log(response.data[0]);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);


  return (
    <div className="App flex bg-white items-center flex-row box-border overflow-auto">
      <Sidebar data={data}/>
      <Output/>
      <Prompt/>
    </div>
  );
}

export default App;
