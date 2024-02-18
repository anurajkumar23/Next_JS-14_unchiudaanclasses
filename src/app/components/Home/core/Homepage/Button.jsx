"use client"
import Link from "next/link";

// eslint-disable-next-line react/prop-types
const Button = ({ children, active, linkto }) => {
  return (
    <Link href={linkto}>
      <div
        className={`text-center text-white text-[13px] px-6 py-3 rounded-md font-bold
        ${active ? "bg-[#FFD60A] text-black" : " bg-[#161D29] ctaButton"}
        hover:scale-95 transition-all duration-200
        `}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
