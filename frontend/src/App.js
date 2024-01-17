// Components
import Sidebar from "./components/Sidebar";
import Output from './components/Output'
import Prompt from "./components/Prompt";
import { useEffect, useState } from "react";
import axios from 'axios'


function App() {

  const [data, setData] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/process_data');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);


  return (
    <div className="App flex bg-white items-center flex-row box-border overflow-auto h-full">
      <Sidebar data={data}/>
      <Output/>
      <Prompt data={data}/>
    </div>
  );
}

export default App;
