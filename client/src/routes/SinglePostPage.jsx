import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Comments from "../components/Comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import Navbar from "../components/Navbar";
import { FaStar } from "react-icons/fa";
import Footer from "../components/Footer";
import ExplorePosts from "../components/ExplorePosts";
import MobileControls from "../components/MobileControls";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "Post not found!";

  return (
    <div>
      <Navbar />

      <div className="flex flex-col p-2 md:p-8 mt-[10px] gap-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {data.img && (
            <div className="w-full md:w-1/4 mt-2 md:mt-0 flex justify-center md:block">
             <Image
             src={data.img}
                className=" w-[250px] md:w-[400px] rounded-xl"
                />

             </div>
          )}

          <div className="flex flex-col gap-1 md:gap-2 items-center md:items-start md:w-2/4">
            <p className="text-[var(--softTextColor2)] text-center md:text-left">
              SUMMARY OF
            </p>
            <h1 className="text-xl md:text-4xl font-semibold text-center md:text-left">
              {data.title}
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-[var(--softTextColor)] text-md md:text-lg">
              <div className="flex  gap-1 md:gap-2">
                <span>Book by:</span>
                <Link   to={`/discover?author=${data.author}`} className="text-[var(--softTextColor2)]" >{data.author}</Link>
             
                <span>Category:</span>
                <Link to={`/discover?cat=${data.category}`}  className="capitalize text-[var(--softTextColor2)]">{data.category}</Link>
                </div>
            </div>
            <div className="flex flex-row justify-center md:justify-start mt-2">
              <FaStar className="text-orange-500 w-[40px] " />
              <FaStar className="text-orange-500 w-[40px] ml-[-15px]" />
              <FaStar className="text-orange-500 w-[40px] ml-[-15px]" />
              <FaStar className="text-orange-500 w-[40px] ml-[-15px]" />
              <FaStar className="text-orange-500 w-[40px] ml-[-15px]" />
            </div>
            
          <div className="block md:hidden text-center">
          <p className="text-[var(--softTextColor2)] mt-2">Comments</p>
          <div className="flex justify-center">
          <Comments postId={data._id} />
          </div>
          </div>

            <p className="mt-2 text-xl md:text-2xl text-justify font-bold">
              Short summary
            </p>
            <p
              className="text-[var(--textColor)] text-[14px] md:text-[18px] text-justify"
              dangerouslySetInnerHTML={{ __html: data.desc }}
            />
          </div>

          <div className="flex flex-col gap-2 items-start md:w-1/4">
          <p className="text-[var(--softTextColor2)] mt-2 ">Explore</p>
          <p className="text-[var(--textColor)] font-bold ">More Books like this</p>

          <ExplorePosts/>

           <div className="hidden md:block">
            <p className="text-[var(--softTextColor2)] mt-5 ">Comments</p>
            <Comments postId={data._id} />
            </div>


          </div>
        </div>
      </div>
      
   
<div className="flex items-center justify-center text-[var(--textColor)] mx-auto">
  <div className="text-center">
    <p className="mt-2 text-sm md:text-lg">
      Contact us makesomaway@gmail.com or call +254 703 394794
    </p>
    <div className="flex justify-center ">
      <PostMenuActions post={data} />
    </div>
    <button
    to="discover"
      className="mt-9 bg-[var(--textColor)] text-[var(--bg)] py-4 text-extrabold text-xl md:text-3xl 
        px-8 rounded-[40px] cursor-pointer hover:bg-white hover:text-black"
    >
      Discover
    </button>
  </div>

    
         
   </div>
   <Footer/>     
   </div>
  );
};

export default SinglePostPage;