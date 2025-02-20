import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Hero = () => {
  return (
    <div className="flex flex-col">
      <div
        className="relative bg-[#0d132d] w-full 
          text-white text-center animate-fadeIn flex flex-col items-center justify-center"
      >
        <img src="/whitehouse.webp" className="h-[100px] mx-auto mb-8" />

        <div className="h-full p-2 box-border">
          <button
            className="mt-4 bg-black text-white py-2 md:py-3 text-extrabold text-lg md:text-2xl 
              px-4 md:px-6 rounded-[40px] border border-1 border-white cursor-pointer 
              hover:bg-white hover:text-black"
          >
            Presidential actions
          </button>

          <div className="max-w-[700px] text-center mx-auto">
            <h1 className="text-6xl md:text-[70px] mt-[40px] mb-[40px] md:mb-[70px] font-official">
              THE UNITED STATES OF AFRICA
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
