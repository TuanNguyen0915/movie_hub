"use client";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchInput = () => {
  const [dropSearch, setDropSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <div className="group relative flex items-center justify-center gap-4">
      <IoSearch
        className="scale-[2] opacity-50 duration-500 group-hover:opacity-100"
        onClick={() => setDropSearch(!dropSearch)}
      />
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search Movie ..."
        className="hidden bg-transparent opacity-50 outline-none duration-500 group-hover:opacity-100 lg:inline"
      />
      {dropSearch && (
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search Movie ..."
          className="absolute top-16 z-10 min-w-full rounded-lg bg-white/5 p-4 opacity-50 outline-none backdrop-blur-lg duration-500 group-hover:opacity-100 lg:hidden"
        />
      )}
    </div>
  );
};

export default SearchInput;
