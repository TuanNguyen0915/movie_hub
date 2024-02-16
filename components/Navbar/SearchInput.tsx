"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchInput = () => {
  const router = useRouter();
  const [dropSearch, setDropSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    router.push(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <form
      className="group relative flex items-center justify-center gap-4"
      onSubmit={handleSubmit}
    >
      <IoSearch
        className="scale-[2] opacity-50 duration-500 group-hover:opacity-100"
        onClick={() => setDropSearch(!dropSearch)}
      />
      <input
        required
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search Movie ..."
        className="hidden bg-transparent opacity-50 outline-none duration-500 group-hover:opacity-100 lg:inline"
      />
      {/* MOBILE VIEW */}
      {dropSearch && (
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search Movie ..."
          className="absolute top-16 z-10 min-w-full rounded-lg bg-black/80 p-4 opacity-50 outline-none backdrop-blur-lg duration-500 group-hover:opacity-100 lg:hidden"
        />
      )}
    </form>
  );
};

export default SearchInput;
