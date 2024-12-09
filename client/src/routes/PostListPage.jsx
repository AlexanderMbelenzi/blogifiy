
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{ zIndex: "10000"}}
        className="bg-[#1DA1F2] text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden"
      >
        {open ? "Close" : "Filter or Search"}
      </button>


import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";
import Search from "../components/Search";
const PostListPage = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // Get the current location object

  // Use URLSearchParams to extract query parameters from the URL
  const params = new URLSearchParams(location.search);

  // Extract the 'category', 'sort', 'author', 'search', and 'cat' parameters (if available)
  const sort = params.get("sort");
  const author = params.get("author");
  const search = params.get("search");
  const cat = params.get("cat"); // Extract 'cat' parameter

  // Build the display string based on available parameters
  const displayText = [
    search ? `Search: ${search}` : "",
    sort ? `Sort: ${sort}` : "",
    author ? `Author: ${author}` : "",
    cat ? `Category: ${cat}` : "", // Display 'cat' if present
  ]
    .filter(Boolean) // Remove empty strings
    .join(" | ") || "All Posts"; // Default to "All Posts" if no filters are applied

  return (
    <div style={{ paddingTop: "70px"}} className="  ">
      
    



      <div className="flex flex-row  justify-between">
      <div className="w-full md:w-3/4 pr-0 md:pr-10">

    <div style={{  zIndex: "10000"}} className="lg:hidden flex  gap-1 justify-center flex-row ">
     <div>
      
     </div>

     <div>
     <Search/>

     </div>
      <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{ zIndex: "10000"}}
        className="bg-[#1DA1F2] text-m text-white px-4 py-2 rounded-xl m mb-4 md:hidden"
        
      >
        {open ? "Close" : "Filter"}

      </button>
      </div>
    

    </div>

    <h1 style={{  zIndex: "10000"}} className="mb-4 lg:mt-[25px] mt-4  lg:mb-[8] lg:text-xl text-md text-gray-700 font-bold">
        {`Blog - ${displayText}`}
      </h1>

      <PostList />
    </div>
    <div className={`${open ? "block" : "hidden"} lg:mt-[30px] md:block w-1/4`}>
        <SideMenu />
    </div>
</div>



 </div>
  );
};

export default PostListPage;
