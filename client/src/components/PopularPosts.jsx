import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import PopularItem from "./PopularItem";
import React, { useRef, useState, useEffect } from "react";

const fetchPosts = async (pageParam, searchParams) => {
  try {
    const searchParamsObj = Object.fromEntries([...searchParams]);

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      params: { page: pageParam, limit: 30, sort: "popular", ...searchParamsObj },
    });

    console.log("Fetched API Data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

const PopularPosts = () => {
  const [searchParams] = useSearchParams();
  const containerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scroll = (direction) => {
    const scrollAmount = 200;
    containerRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  const checkScrollPosition = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    checkScrollPosition();
    const container = containerRef.current;
    container?.addEventListener("scroll", checkScrollPosition);

    return () => container?.removeEventListener("scroll", checkScrollPosition);
  }, []);

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["posts", "popular", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage?.hasMore ? pages.length + 1 : undefined,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });

  if (status === "loading") return <p>Loading popular posts...</p>;
  if (error) return <p>Something went wrong! Please try again.</p>;

  const allPosts = data?.pages?.flatMap((page) => page?.posts || []) || [];
  console.log("All Posts:", allPosts);

  return (
    <div className="relative">
      {showLeftButton && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 top-1/2 transform -translate-y-1/2 hidden md:block bg-[var(--shadow-color)] bg-opacity-5 rounded-full py-2 px-4 z-10"
        >
          <span className="text-white font-bold">&lt;</span>
        </button>
      )}
      {showRightButton && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 hidden md:block bg-[var(--shadow-color)] bg-opacity-50 rounded-full py-2 px-4 z-10"
        >
          <span className="text-white font-bold">&gt;</span>
        </button>
      )}

      <div ref={containerRef} className="flex scrollbar-hide overflow-x-auto" style={{ whiteSpace: "nowrap" }}>
        <InfiniteScroll
          dataLength={allPosts?.length || 0}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<h4>Loading more posts...</h4>}
          className="flex gap-3 md:gap-4 scrollbar-hide"
        >
          {allPosts.length > 0 ? allPosts.map((post) => <PopularItem key={post._id} post={post} />) : <p>No popular posts found.</p>}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default PopularPosts;
