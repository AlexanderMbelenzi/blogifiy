import axios from "axios";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { Send } from "lucide-react";
import Button from "./Button";


const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );
  return res.data;
};

const Comments = ({ postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const [showComments, setShowComments] = useState(false); // Toggle comment box
  const [visibleComments, setVisibleComments] = useState(3); // Initial visible comments
  const [commentSuccess, setCommentSuccess] = useState(false); // Temporary success message

  const { isPending, error, data = [] } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 2000); // Remove message after 2 seconds
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      desc: formData.get("desc"),
    };

    mutation.mutate(data);
    e.target.reset(); // Clear the input field
  };

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 5); // Load 5 more comments
  };

  const closeComments = () => {
    setShowComments(false);
    setVisibleComments(3); // Reset to initial state
  };

  return (
    <div className="flex flex-col gap-1 mb-2">
      {/* Modern Comment Icon */}
      <Button
          onClick={() => setShowComments((prev) => !prev)}       
          className="flex flex-row items-center  text-[14px] md:text-[16px]  justify-center h-[42px]  text-white  rounded-xl"
          size="large"
        >
        <span> Property Reviews</span>
        </Button>
        
      
   

      {/* Comments Section */}
      {showComments && (
        <>
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-[var(--textColore)] text-[var(--textColor)] rounded-xl justify-between gap-1 w-full"
          >
            <textarea
              name="desc"
              placeholder="Write a review..."
              className="w-full pt-1 bg-[var(--textColore)] border-none text-sm mb-[-2px]
               pl-4 text-[var(--textColor)] rounded-xl"
            />
          <button className=" flex items-center px-4 ml-5 py-3  text-sm rounded-xl">
           <Send className="ml-2 w-4 bg-[#ff4d52] text-[#ff4d52] h-4" />
          </button>
          </form>

          {commentSuccess && (
            <p className="text-green-500">Review added successfully!</p>
          )}

          {isPending ? (
            "Loading..."
          ) : error ? (
            "Error loading reviews!"
          ) : (
            <>
              {data.slice(0, visibleComments).map((comment) => (
                <div
                  key={comment._id}
                  className=" p-2 rounded-2xl shadow-2xl mt-3"
                >
                  <Comment comment={comment} postId={postId} />
                </div>
              ))}

              {visibleComments < data.length && (
                <button
                  onClick={loadMoreComments}
                  className=" text-sm text-[#1DA1F2]"
                >
                  Show more reviews
                </button>
              )}
              <button
                onClick={closeComments}
                className="text-[#ff4d52]    text-sm mt-2"
              >
                Close reviews
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
