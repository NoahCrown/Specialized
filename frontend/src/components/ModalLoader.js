import React from 'react';
import Loader from './Loader';
import { useCandidate } from "../context/Context";


const ModalLoader = () => {
  const {loaderContext} = useCandidate()


  return (
    <div className="absolute flex justify-center items-center w-full  min-h-[149vh] backdrop-blur-sm backdrop-brightness-50	 z-50">
      <div className="absolute flex justify-center w-full h-1/2">
        <dialog open id="modal" className=" flex flex-col justify-center gap-2 absolute min-w-[45%] max-w-[45%] min-h-[55vh] max-h-[55vh] m p-[2rem] border-0 rounded-lg text-[#919191]">
        <div className=" w-full px-2 py-2">
        <img
          src={require("../img/specialized_icon.png")}
          alt="specialized-icon"
          className="w-1/3"
        />
      </div>
        {loaderContext === 'Inferring' ?
        <>
        <h2 className='transition ease-in-out delay-150 animate-pulse	 text-center text-[1.75rem]'>Inferring Missing Data...</h2>
        <p className=' transition ease-in-out delay-150 animate-pulse   text-[1.10rem] text-center'>We're currently processing and analyzing the data from a CV to extract relevant information. This step ensures that we provide accurate and valuable insights.</p>
        </>
         :
         <>
        <h2 className='transition ease-in-out delay-150 animate-pulse	 text-center text-[1.75rem]'>Parsing CV Data</h2>
        <p className=' transition ease-in-out delay-150 animate-pulse   text-[1.10rem] text-center'>We're processing the parsing of your CV data into a usable JSON Format, please be patient with us. We're ensuring we get the best result as possible.</p>
        </>
          }
          
          <Loader />
        </dialog>
      </div>
    </div>
  );
};

export default ModalLoader;
