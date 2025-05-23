import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {" "}
      <g clipPath="url(#clip0_104_157)">
        {" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200ZM100 143.75C124.162 143.75 143.75 124.162 143.75 100C143.75 75.8375 124.162 56.25 100 56.25C75.8375 56.25 56.25 75.8375 56.25 100C56.25 124.162 75.8375 143.75 100 143.75Z"
          fill="url(#paint0_linear_104_157)"
        />{" "}
      </g>{" "}
      <defs>
        {" "}
        <linearGradient
          id="paint0_linear_104_157"
          x1="100"
          y1="0"
          x2="100"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          {" "}
          <stop stopColor="#DF99F7" /> <stop offset="1" stopColor="#FFDBB0" />{" "}
        </linearGradient>{" "}
        <clipPath id="clip0_104_157">
          {" "}
          <rect width="200" height="200" fill="white" />{" "}
        </clipPath>{" "}
      </defs>{" "}
    </svg>
  );
};

export default Logo;
