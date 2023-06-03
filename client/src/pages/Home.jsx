import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import trending from "../assets/trending.svg";
import { PostCard, Loader } from "../components";

const Home = ({ text }) => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_URL}/api/v1/post`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  const handleChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResult(searchResults);
      }, 500)
    );
  };

  // if (loading) return <Loader />;

  return (
    <section className="p-5 lg:p-10 max-w-7xl mx-auto xl:w-available lg:w-full overflow-scroll no_scroll w-screen lg:h-responsive_height h-full_image">
      <div className="max-w-7xl mx-auto font-medium flex items-center justify-between">
        <h1 className="text-4xl leading-relaxed">Community Showcase</h1>

        <Link
          to="/create"
          className="px-4 hidden cursor-pointer py-2 bg-lighter hover:bg-hover/50 rounded-full lg:flex items-center gap-2 w-max"
        >
          <img src={trending} alt="Add" className="w-5 h-5" /> <span>Add</span>
        </Link>
      </div>
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder="Search Community"
        className="w-full rounded-lg bg-lighter p-3 mt-2 outline-none border-none"
      />
      {allPosts && (
        <div className="py-10 grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-4">
          {searchText ? (
            <>
              {searchResult?.map((post) => (
                <PostCard key={post._id} {...post} />
              ))}
            </>
          ) : (
            <>
              {allPosts.map((post) => (
                <PostCard key={post._id} {...post} />
              ))}
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Home;
