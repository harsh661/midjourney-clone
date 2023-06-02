import React from "react";
import { Link } from "react-router-dom";
import search from "../assets/search.svg";
import signin from "../assets/signin.svg";

const Sidebar = ({ shown }) => {
  return (
    <div
      className={`h-responsive p-3 ${
        shown ? "block" : "hidden lg:block"
      } animate-slide-right group relative lg:absolute xl:relative h-screen z-10`}
    >
      <div className="bg-lighter xl:bg-transparent rounded-2xl w-max h-full flex flex-col justify-between items-center p-2 transition-all duration-200">
        <div className="flex flex-col gap-5 h-full">
          <Link
            to="/"
            className="p-3 text-lg hidden lg:block xl:hidden group-hover:hidden"
          >
            MJ
          </Link>
          <Link
            to="/"
            className="p-3 text-lg lg:hidden xl:block group-hover:block"
          >
            Midjourney
          </Link>

          {/* Search button */}
          <span className="p-3 hover:bg-hover/50 rounded-lg flex items-center gap-3 cursor-pointer">
            <img src={search} alt="search" className="w-5 h-5" />
            <span className="pr-2 lg:hidden xl:block group-hover:block">Community Showcase</span>
          </span>
        </div>
        <span className="p-3 hover:bg-hover/50 rounded-lg flex items-center gap-3 cursor-pointer w-full">
          <img src={signin} alt="search" className="w-5 h-5" />
          <span className="lg:hidden xl:block group-hover:block">Sign in</span>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
