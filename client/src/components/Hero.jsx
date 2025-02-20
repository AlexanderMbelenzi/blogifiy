import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CategoriesScroll from "./CategoriesScroll";


const Hero = () => {
  return (
    <div className="relative flex mb-[20px] bg-[#0d132d] flex-col h-screen">
      <div 
        className="relative w-full text-white text-center animate-fadeIn flex flex-col items-center justify-center"
      >
        <img src="/whitehouse.webp" className="h-[100px] mx-auto mb-8" />

        <div className="h-full p-2 box-border">
          <button
            className="mt-4 text-white py-1 text-extrabold text-sm md:text-lg 
              px-5 rounded-[40px] border border-1 border-white cursor-pointer 
              hover:border-gray-700"
          >
            PRESIDENTIAL ACTIONS
          </button>

          <div className="max-w-[700px] text-center mx-auto">
            <h1 className="text-5xl md:text-[70px] mt-[40px] pl-9 pr-9 mb-[40px] md:mb-[70px] font-thin">
              <span className="font-official">
                THE UNITED STATES OF AFRICA
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Categories at the bottom */}
      <div className="absolute bottom-[150px] md:bottom-[130px] left-1/2 transform -translate-x-1/2 w-full max-w-[900px]">
        <CategoriesScroll />
        <div className="text-center mx-auto">
         <p className="text-xs md:text-sm  text-white ">
          AFRICA, THE LAND OF DREAMS MILK AND HONEY
         </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
