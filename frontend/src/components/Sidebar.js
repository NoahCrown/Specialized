import React, { useState, useRef } from "react";
import { useCandidate } from "../context/Context";
import PDFInfo from "./PDFInfo";
import axios from "axios";
import { Carousel } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Sidebar = () => {
  const fileInputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [missingDataToSearch, setMissingDataToSearch] = useState(null);
  const { setOutput, setModeOfData, data, selectedFile, setUploadFile } =
    useCandidate();

  console.log(searchResults);
  console.log(inputValue);

  console.log(data);
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const chunkedData = chunkArray(data, 3);
  const chunkedSearchResults = chunkArray(searchResults, 3);

  console.log();

  const handleDrag = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setUploadFile(event.dataTransfer.files[0]);
  };

  const handleMissingDataSearch = (event) => {
    setMissingDataToSearch(event.target.value);
  };

  const handleSearch = () => {
    // Make a POST request to the API using Axios
    axios
      .post("/search_name", { name: inputValue })
      .then((response) => {
        // Handle the successful response
        setSearchResults(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setInputValue("");
    toast.success("Cleared")
  };

  const handleDivClick = () => {
    // Trigger the hidden file input click event
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setUploadFile(event.target.files[0]);
    toast.success('File uploaded successfully')
  };

  const handleUpload = () => {
    // Check if a file is selected
    if (!selectedFile) {
      return;
    }
    setModeOfData("CV");

    // const formData = new FormData();
    console.log(selectedFile);

    const formData = new FormData();
    formData.append("pdfFile", selectedFile);

    // Replace 'YOUR_UPLOAD_URL' with your actual server endpoint
    axios
      .post("/upload", formData)

      .then((response) => {
        // Handle the response from the server
        console.log("File uploaded successfully:", response.data);
        setOutput(response.data);
        console.log(formData);
        toast.success('File uploaded successfully')
      })
      .catch((error) => {
        // Handle any errors
        console.log(formData);

        console.error("Error uploading file:", error);
      });
  };

  return (
    <div className=" box-border flex justify-center items-center w-1/4 flex-col max-h-fit ">
      {/* Specialized Nav */}
      <div className="border-solid border-b-2 border-[#E7E7E7] w-full px-2 py-2">
        <img
          src={require("../img/specialized_icon.png")}
          alt="specialized-icon"
          className="w-1/2"
        />
      </div>
      {/* Pdf Info */}
      <div className="flex justify-center items-center flex-col p-3 w-[80%] px-4 border-solid border-b-2 border-[#E7E7E7]">
        <div className="w-[100%] flex flex-col">
          <div className="rounded-sm border-dashed border-2 border-[#E7E7E7] w-[100%] h-[20vh] flex flex-col justify-center items-center p-10 gap-2">
            <div
              className="flex flex-col justify-center items-center"
              onClick={handleDivClick}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <>
                  <div className="flex flex-row justify-center items-center gap-3 w-full ">
                    <div className="rounded-full bg-[#D3D3D3] w-[15%] flex justify-center items-center p-2">
                      <img
                        src={require("../img/pdf_icon.png")}
                        alt="pdf-icon"
                        className="w-[80%]"
                      />
                    </div>
                    <p className="text-[.75rem] min-w-[60%] max-w-[60%] break-words">
                      {selectedFile.name}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <img src={require("../img/upload.jpg")} alt="upload"></img>
                  <input
                    type="file"
                    accept="application/pdf"
                    name="pdfFile"
                    className="upload-button hidden w-full"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                  <label id="upload-text">
                    <span
                      class="text-[.75rem] text-[#919191]"
                      id="upload-click"
                    >
                      Upload a CV from your computer
                    </span>
                  </label>
                </>
              )}
            </div>

            <button
              className="rounded-md bg-black text-white px-8 font-bold py-3 text-[.75rem]"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
      {/* Search Bar  */}
      <div className="flex justify-center items-center flex-col gap-2 w-[80%] py-4 border-solid border-b-2 border-[#E7E7E7]">
        <label className="text-[.80rem] text-[#8F8F8F] w-full text-left">
          Search by name
        </label>
        <div className="border-solid border-2 border-[#E7E7E7] w-full flex flex-row justify-between items-center gap-4 p-2 ">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-[90%] text-sm focus:outline-none"
            placeholder="Search for a job position or name... "
          />
          <i
            onClick={handleClearSearch}
            class="fa-solid fa-x w-[10%] hover:cursor-pointer"
          ></i>
        </div>
        <button
          onClick={handleSearch}
          className="bg-black text-white w-full rounded-md p-2 hover:cursor-pointer "
        >
          Search
        </button>
      </div>

      <div className="flex justify-center items-center flex-col gap-2 w-[80%] py-4 border-solid border-b-2 border-[#E7E7E7]">
        <label className="text-[.80rem] text-[#8F8F8F] w-full text-left">
          Search by missing data
        </label>
        <div className="border-solid border-2 border-[#E7E7E7] w-full flex flex-row justify-between items-center gap-4 p-2">
          <select
            className="w-full"
            value={missingDataToSearch}
            onChange={handleMissingDataSearch}
          >
            <option value="age">Age</option>

            <option value="languageSkills">Language Skills EN</option>

            <option value="location">Location</option>
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="bg-black text-white w-full rounded-md p-2 hover:cursor-pointer "
        >
          Search
        </button>
      </div>
      {/* Results  */}
      <div className="w-full">
        <p className="px-10 mb-3">Results</p>
          <div className="">
            {searchResults.length > 0 ? (
              <Carousel  navigation={false}>
                {chunkedSearchResults.map((chunk, index) => (
                  <div key={index} className="carousel-slide">
                    {chunk.map((item) => (
                      <PDFInfo
                        key={item.candidate.id}
                        id={item.candidate.id}
                        first_name={item.candidate.firstName}
                        last_name={item.candidate.lastName}
                        position={item.jobOrder.title || "N/A"}
                      />
                    ))}
                  </div>
                ))}
              </Carousel>
            ) : (
              <Carousel navigation={false}>
                {chunkedData.map((chunk, index) => (
                  <div key={index} className="carousel-slide">
                    {chunk.map((item) => (
                      <PDFInfo
                        key={item.candidate.id}
                        id={item.candidate.id}
                        first_name={item.candidate.firstName}
                        last_name={item.candidate.lastName}
                        position={item.jobOrder.title || "N/A"}
                      />
                    ))}
                  </div>
                ))}
              </Carousel>
            )}
          </div>
          
        </div>
        <ToastContainer/>
      </div>
  );
};

export default Sidebar;
