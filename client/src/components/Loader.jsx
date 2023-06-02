import React from "react";

const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="animate-spin duration-[2000ms]">
        <svg
          className="inline-block animate-spin text-blue-400"
          color=""
          height="32"
          width="32"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Loading">
            <path
              d="M1.03545 11.1104C1.48833 5.4513 6.22434 1 12 1C18.0751 1 23 5.92487 23 12C23 17.7757 18.5486 22.5118 12.8894 22.9646V20.9566C17.4425 20.51 21 16.6704 21 12C21 7.02944 16.9706 3 12 3C7.32962 3 3.49013 6.55744 3.04341 11.1104L1.03545 11.1104Z"
            ></path>
          </g>
        </svg>
      </span>
    </div>
  );
};

export default Loader;
