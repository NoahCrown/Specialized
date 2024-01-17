import React, {useState, useRef} from 'react'
import PDFInfo from './PDFInfo'
import axios from 'axios';

const Sidebar = ({data}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults)

  const handleSearch = () => {
    // Define the API endpoint
    const apiUrl = '/search_name';

    // Create a POST request data
    const requestData = { name: inputValue };

    // Make a POST request to the API using Axios
    axios
      .post(apiUrl, requestData)
      .then(response => {
        // Handle the successful response
        setSearchResults(response.data);
      })
      .catch(error => {
        // Handle errors here
        console.error(error);
      });
  };

  const handleDivClick = () => {
    // Trigger the hidden file input click event
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // You can handle the file upload logic here
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile)
    }
}
  return (
    <div className='flex justify-center items-center w-1/4 flex-col h-full'>
    {/* Specialized Nav */}
    <div className='border-solid border-b-2 border-[#E7E7E7] w-full px-2 py-2'>
            <img src={require('../img/specialized_icon.png')} alt='specialized-icon' className='w-1/2'/>
        </div>
    {/* Pdf Info */}
        <div className='flex justify-center items-center flex-col p-3 w-[80%] px-4 border-solid border-b-2 border-[#E7E7E7] '>
                <div className='w-[100%] flex flex-col gap-'>
                    <div className='rounded-sm border-dotted border-2 border-[#E7E7E7] w-[100%] h-[20vh] flex flex-col justify-center items-center p-10 gap-2'>                    
                        <div className='flex flex-col justify-center items-center'
                        onClick={handleDivClick}>
                            <img src={require('../img/upload.jpg')} alt='upload'></img>
                            <input
                            type="file"
                            accept="application/pdf"
                            name="pdf"
                            className='upload-button hidden w-full' 
                            onChange={handleFileChange}
                            ref={fileInputRef} />
                            <label id="upload-text">
                                <span class="text-[.75rem] text-[#919191]" id="upload-click">Upload a CV from your computer</span>
                            </label>
                            
                        </div>
                        
                        <button className='rounded-md bg-black text-white px-8 font-bold py-3 text-[.75rem]' onClick={handleUpload}>Upload</button>
                    </div>
                
                </div>
            </div>
    {/* Search Bar  */}
        <div className='flex justify-center items-center flex-col gap-2 w-[80%] py-4 border-solid border-b-2 border-[#E7E7E7]'>
        <label className='text-[.80rem] text-[#8F8F8F]'>Search by name</label>
            <div className='border-solid border-2 border-[#E7E7E7] w-full flex flex-row justify-between items-center gap-4 p-2'>
                <input 
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)} 
                  className='w-[90%] text-sm focus:outline-none' 
                  placeholder='Search for a job position or name... '/>
                <i class="fa-solid fa-x w-[10%] hover:cursor-pointer" ></i>
            </div>
            <button onClick={handleSearch} className='bg-black text-white w-full rounded-md p-2 hover:cursor-pointer '>Search</button>
        </div>

        <div className='flex justify-center items-center flex-col gap-2 w-[80%] py-4 border-solid border-b-2 border-[#E7E7E7]'>
            <label className='text-[.80rem] text-[#8F8F8F]'>Search by missing data</label>
            <div className='border-solid border-2 border-[#E7E7E7] w-full flex flex-row justify-between items-center gap-4 p-2'>
                <input className='w-[90%] text-sm focus:outline-none' placeholder='Search for a job position or name... '/>
                <i class="fa-solid fa-x w-[10%] hover:cursor-pointer" ></i>
            </div>
            <button onClick={handleSearch} className='bg-black text-white w-full rounded-md p-2 hover:cursor-pointer '>Search</button>
        </div>
    {/* Results  */}
        <div className='w-full '>
            <p className='px-10'>Results</p>
            {data.slice(0, 3).map((val) => (    
                <PDFInfo key={val.id} id={val.id} first_name={val.first_name} last_name={val.last_name} position={val.specialties} />
            ))}
        </div>
        

    </div>
  )
}

export default Sidebar