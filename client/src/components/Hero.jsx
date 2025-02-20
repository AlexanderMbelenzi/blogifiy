import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


const Hero = () => {


  return (
    <div className="flex flex-col ">
    <div
         className="relative bg-[#7a00da]  w-full rounded-md md:rounded-[30px] shadow-md 
           text-white text-center animate-fadeIn flex flex-col items-center justify-center"
       >
             <img
           src="/whitehouse.webp"
           className="h-[200px] mx-auto mb-8 "
         />

         <div className="h-full p-2  box-border">
         <button
             className="mt-9 bg-black text-white py-4 text-extrabold text-lg  md:text-2xl 
               px-8 rounded-[40px] border border-1 border-white  cursor-pointer hover:bg-white hover:text-black "
           >
             Presidential actions
           </button>
            <div className="max-w-[600px] text-center mx-auto">

           <h1 className="text-3xl md:text-6xl mt-[20px] md:mt-[70px] mb-[20px] md:mb-[70px] font-bold">
           THE UNITE STATES OF AFRICA
           </h1>
           </div>

         </div>
    
       </div>
   

    </div>
  );
};

export default Hero;
