import React, { useState, useEffect } from 'react';
import Loader from './Loader';

const ModalLoader = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    {
      title: 'Analyzing...',
      content: "We're currently processing and analyzing the data from a CV to extract relevant information. This step ensures that we provide accurate and valuable insights.",
    },
    {
      title: 'This may take a moment...',
      content: 'As we analyze the information, we aim for precision to ensure that the data we present is as insightful and relevant as possible.',
    },
    {
      title: 'Thank you for your patience...',
      content: "We appreciate your patience as we work diligently to provide you with the best possible results. Your understanding and cooperation are greatly valued.",
    },
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, 4000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute flex justify-center items-center w-full  min-h-[145vh] backdrop-blur-sm backdrop-brightness-50	 z-50">
      <div className="absolute flex justify-center w-full h-1/2">
        <dialog open id="modal" className=" flex flex-col justify-center gap-2 absolute min-w-[45%] max-w-[45%] min-h-[55vh] max-h-[55vh] m p-[2rem] border-0 rounded-lg text-[#919191]">
        <div className=" w-full px-2 py-2">
        <img
          src={require("../img/specialized_icon.png")}
          alt="specialized-icon"
          className="w-1/3"
        />
      </div>
          <h2 className='transition ease-in-out delay-150 animate-pulse	 text-center text-[1.75rem]'>{texts[textIndex].title}</h2>
          <p className=' transition ease-in-out delay-150 animate-pulse   text-[1.10rem] text-center'>{texts[textIndex].content}</p>
          <Loader />
        </dialog>
      </div>
    </div>
  );
};

export default ModalLoader;
