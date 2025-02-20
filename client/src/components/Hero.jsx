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
            className="mt-4  text-white py-2  text-extrabold text-sm md:text-lg 
              px-4 rounded-[40px] border border-1 border-white cursor-pointer 
              hover:border-gray-700"
          >
            Presidential actions
          </button>

          <div className="max-w-[700px] text-center mx-auto">
            <h1 className="text-5xl md:text-[70px] mt-[40px] mb-[40px] md:mb-[70px] font-thin">
              <span className=" font-official">
              THE UNITED STATES OF AFRICA

              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
