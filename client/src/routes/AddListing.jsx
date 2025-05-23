
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import ReactQuill from "react-quill-new";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";
import "react-quill-new/dist/quill.snow.css";
import Navbar from "../components/Navbar";

const AddListing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isLoaded, isSignedIn } = useUser();
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [amenities, setSelectedAmenities] = useState([]);
  const [img, setImg] = useState([]); 
  const [model, setModel] = useState("");
  const [propertysize, setPropertySize] = useState("");
  const [propertytype, setPropertyType] = useState("");
  const [propertyname, setPropertyName] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [rooms, setRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [specification, setSpecification] = useState("");

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [duration, setDuration] = useState("1");
  
  const featuredUntilDate = isFeatured
    ? new Date(Date.now() + parseInt(duration) * 24 * 60 * 60 * 1000)
    : null;


  const navigate = useNavigate();
  const { getToken } = useAuth();

  const handleAmenities = (event) => {
    const { value, checked } = event.target;
  
    setSelectedAmenities((prevAmenities) =>
      checked ? [...prevAmenities, value] : prevAmenities.filter((amenity) => amenity !== value)
    );
  };
  

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });

  const clearError = () => setError("");

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();

    const submitButton = e.nativeEvent.submitter;
    if (!submitButton || submitButton.name !== "submitPost") return;

    let missingFields = [];
    if (!title.trim()) missingFields.push("Title");
 
    if (missingFields.length > 0) {
      setError(`Missing fields: ${missingFields.join(", ")}`);
      return;
    }

    let slug = title.trim().replace(/\s+/g, "-").toLowerCase();
    slug = slug.replace(/[^a-z0-9-]/g, "").replace(/-+$/, "");
    slug += "-summary";

    const data = {
      title,
      whatsapp,
      phone,
      price,
      desc,
      slug,
      amenities,
      img: img.map((img) => img.url), 
      model,
      propertytype,
      specification,
      propertyname,
      propertysize,
      bathrooms,
      rooms,
      bedrooms,
      isFeatured,
      featuredUntil: featuredUntilDate,
    };

    mutation.mutate(data);
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>You need to sign in to create a post!</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-[900px] mx-auto flex flex-col mb-[100px]  px-4 md:px-[80px] justify-center items-center overflow-x-scroll">
        <h1 className="text-xl md:text-3xl mt-[30px] mb-[30px] text-[var(--textColor)] font-semibold">
          Create a New Post
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      

        <Upload type="image" setProgress={setProgress} setData={setImg}>
  <button className="p-2 bg-[var(--textColore)] text-[var(--textColor)] rounded-lg">
    Upload Additional Images
  </button>
</Upload>

{img.length > 0 && (
  <div className="flex flex-wrap gap-2">
    {img.map((img, index) => (
      <img key={index} src={img.url} alt="Uploaded" className="w-[100px] h-[100px] object-cover" />
    ))}
  </div>
)}




        {/*  property type Selection */}
        <h1>
          which one best describes your proprty type
        </h1>
        <select value={propertytype} onChange={(e) => setPropertyType(e.target.value)} className="p-2 bg-[var(--textColore)] text-[var(--textColor)] rounded">
          <option value="" disabled> select Your property type</option>
          <option value="apartment">Apartment/Flat</option>
          <option value="studio">Studio Apartment</option>
          <option value="bedsitter">Bedsitter</option>
          <option value="single-room">Single Room</option>
          <option value="town-house">Town House</option>
          <option value="bungalow">Bungalow</option>
          <option value="mansionatte">Mansionatte</option>
          <option value="villa">Villa</option>
          <option value="container">Container</option>
          <option value="office">Office</option>
          <option value="shop">Shop</option>
          <option value="warehouse">Warehouse</option>
          <option value="land">Plot/Land</option>

        </select>



  
  {/* Specification Dropdown */}
  <div>
    <label className="block text-sm font-medium mb-1">Select a Specification</label>
    <select
      value={specification}
      onChange={(e) => setSpecification(e.target.value)}
      className="p-3 w-full bg-[var(--textColor)] text-[var(--softBg)] rounded border border-gray-300 focus:ring-2 focus:ring-orange-500"
    >
      <option value="" disabled>Select a Specification</option>
      <option value="entire-place">An Entire Place</option>
      <option value="a-room">A Room</option>
      <option value="shared-room">A Shared Room</option>
    </select>
  </div>

  {/* Number of Bathrooms */}
  <div>
    <label className="block text-sm font-medium mb-1">Number of Bathrooms</label>
    <input
      type="number"
      placeholder="Enter number of bathrooms"
      value={bathrooms}
      onChange={(e) => setBathrooms(e.target.value)}
      className="p-3 w-full bg-[var(--textColor)] text-[var(--softBg)] rounded border border-gray-300 focus:ring-2 focus:ring-orange-500"
    />
  </div>

  {/* Number of Bedrooms */}
  <div>
    <label className="block text-sm font-medium mb-1">Number of Bedrooms</label>
    <input
      type="number"
      placeholder="Enter number of bedrooms"
      value={bedrooms}
      onChange={(e) => setBedrooms(e.target.value)}
      className="p-3 w-full bg-[var(--textColor)] text-[var(--softBg)] rounded border border-gray-300 focus:ring-2 focus:ring-orange-500"
    />
  </div>

    {/* Number of Rooms */}
    <div>
    <label className="block text-sm font-medium mb-1"> Total Number of Rooms</label>
    <input
      type="number"
      placeholder="Enter number of Rooms"
      value={rooms}
      onChange={(e) => setRooms(e.target.value)}
      className="p-3 w-full bg-[var(--textColor)] text-[var(--softBg)] rounded border border-gray-300 focus:ring-2 focus:ring-orange-500"
    />
  </div>


  {/* Property Size */}
  <div>
    <label className="block text-sm font-medium mb-1">Property Size (sq ft)</label>
    <input
      type="number"
      placeholder="Enter property size in sq ft"
      value={propertysize}
      onChange={(e) => setPropertySize(e.target.value)}
      className="p-3 w-full bg-[var(--textColor)] text-[var(--softBg)] rounded border border-gray-300 focus:ring-2 focus:ring-orange-500"
    />
  </div>







        {/*  Model */}
       
        <select value={model} onChange={(e) => setModel(e.target.value)} className="p-2 bg-[var(--textColore)] text-[var(--textColor)] rounded">
          <option value="" disabled>     For sale/ for rent     </option>
          <option value="forrent">For Rent</option>
          <option value="forsale">For Sale </option>

        </select>

        <input type="text" placeholder="Enter Post Title" value={title} onChange={(e) => setTitle(e.target.value.slice(0, 500))} className="p-2 bg-[var(--textColore)] text-[var(--textColor)]  rounded" />
        <input type="text" placeholder="Enter the name of this building /property" value={propertyname} onChange={(e) => setPropertyName(e.target.value.slice(0, 500))} className="p-2 bg-[var(--textColore)] text-[var(--textColor)]  rounded" />


        <ReactQuill 
  value={desc} 
  onChange={setDesc} 
  placeholder="Book summary..."
  className="bg-[var(--textColore)] text-[var(--textColor)] rounded"
  modules={{
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ align: [] }],
      ["link", "image"], // Removed color options
      ["clean"],
    ],
  }}
  formats={[
    "header", "bold", "italic", 
    "list", "bullet", "blockquote", "code-block",
    "align", 
  ]}
/>

       {/* Amenities Amenities */}

<div className="p-4 bg-[var(--softBg)] text-[var(--textColor)] rounded-lg shadow-md space-y-6">
  {/* Internal Amenities */}
  <div>
    <label className="block text-lg font-semibold mb-2">Internal Amenities</label>
    <div className="grid grid-cols-2 gap-3">
      <label className="flex items-center space-x-2">
        <input type="checkbox" value="lift" onChange={handleAmenities} />
        <span>Lift</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" value="balcony" onChange={handleAmenities} />
        <span>Balcony</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" value="air-conditioning" onChange={handleAmenities} />
        <span>Air Conditioning</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" value="gym" onChange={handleAmenities} />
        <span>Gym</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" value="swimming-pool" onChange={handleAmenities} />
        <span>Swimming Pool</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" value="wifi" onChange={handleAmenities} />
        <span>WiFi</span>
      </label>
    </div>
  </div>

  {/* External Amenities */}
  <div>
    <label className="block text-lg font-semibold mb-2">External Amenities</label>
    <div className="grid grid-cols-2 gap-3">
      <label className="flex items-center space-x-2">
        <input type="checkbox" value="parking" onChange={handleAmenities} />
        <span>Parking</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" value="security" onChange={handleAmenities} />
        <span>24/7 Security</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" value="garden" onChange={handleAmenities} />
        <span>Garden</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" value="playground" onChange={handleAmenities} />
        <span>Children’s Playground</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" value="backup-generator" onChange={handleAmenities} />
        <span>Backup Generator</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" value="clubhouse" onChange={handleAmenities} />
        <span>Clubhouse</span>
      </label>
    </div>
  </div>


</div>



<div className="p-4 bg-[var(--softBg)] text-[var(--textColor)] rounded-lg shadow-md space-y-4">
  {/* Price Input */}
  <div>
    <label className="block text-sm font-medium mb-1">Price </label>
    <input
      type="number"
      placeholder="Enter price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="p-3 w-full bg-[var(--textColor)] text-[var(--softBg)] rounded border border-gray-300 focus:ring-2 focus:ring-orange-500"
    />
  </div>

  {/* Phone Number Input */}
  <div>
    <label className="block text-sm font-medium mb-1">Phone Number</label>
    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
      <span className="p-3 bg-gray-200 text-gray-700">+254</span>
      <input
        type="tel"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-3 w-full bg-[var(--textColor)] text-[var(--softBg)] focus:ring-2 focus:ring-orange-500"
      />
    </div>
  </div>

  {/* WhatsApp Number Input */}
  <div>
    <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
      <span className="p-3 bg-gray-200 text-gray-700">+254</span>
      <input
        type="tel"
        placeholder="Enter WhatsApp number"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        className="p-3 w-full bg-[var(--textColor)] text-[var(--softBg)] focus:ring-2 focus:ring-orange-500"
      />
    </div>
  </div>
</div>


        {/* Featured Checkbox */}
        <label className="flex flex-col gap-2">
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={isFeatured}
      onChange={() => setIsFeatured(!isFeatured)}
    />
    Boost your Listing
  </div>

  {isFeatured && (
    <select
      value={duration}
      onChange={(e) => setDuration(e.target.value)}
      className="border p-1 rounded"
    >
      <option value="1">1 day</option>
      <option value="2">2 days</option>
      <option value="3">3 days</option>
      <option value="4">4 days</option>
      <option value="5">5 days</option>
      <option value="6">6 days</option>
      <option value="7">1 week</option>
      <option value="14">2 weeks</option>
      <option value="21">3 weeks</option>
      <option value="30">1 month</option>
      <option value="60">2 months</option>
      <option value="90">3 months</option>
      <option value="120">4 months</option>
      <option value="150">5 months</option>
      <option value="180">6 months</option>
      <option value="364">1 year</option>



    </select>
  )}
</label>


        {error && <div className="text-red-600">{error}</div>}

        <button 
  name="submitPost" 
  type="submit" 
  disabled={mutation.isPending || (progress > 0 && progress < 100)}
  className="bg-blue-500 text-white p-2 rounded"
>
  {mutation.isPending ? "Publishing..." : "Publish Post"}
</button>

        <span>Upload Progress: {progress}%</span>
      
      </form>
    </div>
    
    </div>

  );
};

export default AddListing;

