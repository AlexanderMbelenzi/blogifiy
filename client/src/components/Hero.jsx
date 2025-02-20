import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CategoriesScroll from "./CategoriesScroll";

const Hero = () => {
  

  return (
    <div className="flex flex-col h-screen bg-[#0d132d] text-white">
      {/* Content container */}
      <div className="flex flex-col items-center justify-center flex-grow text-center animate-fadeIn">
        <img src="/whitehouse.webp" className="h-[100px] mx-auto mb-8" />

        <button
          className="mt-4 text-white py-1 text-extrabold text-sm md:text-lg 
            px-5 rounded-[40px] border border-white cursor-pointer 
            hover:border-gray-700"
        >
          PRESIDENTIAL ACTIONS
        </button>

        <div className="max-w-[700px] mx-auto mt-[40px] mb-[40px] md:mb-[70px]">
          <h1 className="text-5xl md:text-[70px] font-thin">
            <span className="font-official">THE UNITED STATES OF AFRICA</span>
          </h1>
        </div>
      </div>

      {/* Categories at 80vh */}
      <div className="mt-auto h-[20vh] flex items-end justify-center max-w-[900px] o">

        <CategoriesScroll />
      </div>
    </div>
  );
};

export default Hero;
