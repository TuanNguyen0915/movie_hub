import { IoSearch } from "react-icons/io5";

const SearchInput = () => {
  return (
    <div className="group flex items-center justify-center gap-4">
      <IoSearch className="scale-[2] opacity-80 duration-500 hover:opacity-100" />
      <input
        type="text"
        placeholder="Search Movie ..."
        className="bg-transparent opacity-80 outline-none duration-500 hover:opacity-100"
      />
    </div>
  );
};

export default SearchInput;
