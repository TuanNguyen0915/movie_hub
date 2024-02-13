"use client";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  
  const handleScrolling = () => {
    if (window.scrollX > 100) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrolling);
    // Cleanup function when component unmount (don't scroll)
    return () => window.removeEventListener("scroll", handleScrolling);
  }, []);
  
  return (
    <div
      className={`sticky top-0 z-10 flex w-full items-center justify-between px-5 lg:px-0 ${isScroll && "bg-red-500"}`}
    >
      {/* LOGO */}
      <div className="group flex items-center">
        <Link href="/">
          <span className="text-3xl font-bold text-red-500 duration-1000 group-hover:text-white md:text-5xl">
            Movie
          </span>
          <span className="ml-1 text-xl font-semibold duration-1000 group-hover:text-red-500 md:text-3xl">
            Hub
          </span>
        </Link>
      </div>
      {/* NAV LINK */}
      <div className="hidden items-center gap-10 lg:flex">
        <Link
          href="/"
          className="text-xl font-semibold duration-700 hover:text-red-500"
        >
          Home
        </Link>
        <Link
          href="/my-list"
          className="text-xl font-semibold duration-700 hover:text-red-500"
        >
          My List
        </Link>
      </div>
      {/* SEARCH-BAR AND AVATAR */}
      <div className="flex items-center justify-end gap-16 lg:gap-5">
        <SearchInput />
        <img
          src="https://avatar.iran.liara.run/public/boy?username=loginuser"
          alt="avatar"
          className="h-14 w-14 rounded-full duration-500 hover:scale-150"
          onClick={() => setDropDownMenu(!dropDownMenu)}
        />
      </div>
      {dropDownMenu && (
        <div className="absolute right-10 top-20 z-20 flex min-w-40 flex-col gap-4 rounded-xl bg-white/5 p-4 backdrop-blur-lg">
          <Link
            onClick={() => setDropDownMenu(false)}
            href="/"
            className="text-end text-lg font-semibold text-white duration-700 hover:text-red-500"
          >
            Home
          </Link>
          <Link
            onClick={() => setDropDownMenu(false)}
            href="/my-list"
            className="text-end text-lg font-semibold text-white duration-700 hover:text-red-500"
          >
            My List
          </Link>
          <p
            onClick={() => setDropDownMenu(false)}
            className="text-end text-lg font-semibold text-white duration-700 hover:text-red-500"
          >
            Log Out
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
