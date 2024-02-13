import Image from "next/image";
import Link from "next/link";
import SearchInput from "./SearchInput";

const Navbar = () => {
  return (
    <div className="sticky top-0 flex w-full items-center justify-between">
      {/* LOGO */}
      <div className="group flex items-center">
        <Link href="/">
          <span className="text-3xl font-bold text-red-500 duration-1000 group-hover:text-white">
            Movie
          </span>
          <span className="ml-1 text-xl font-semibold duration-1000 group-hover:text-red-500">
            Hub
          </span>
        </Link>
      </div>
      {/* NAV LINK */}
      <div className="flex items-center gap-10">
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
      <div className="flex items-center justify-end gap-10">
        <SearchInput />
        <img
          src="https://avatar.iran.liara.run/public/boy?username=loginuser"
          alt="avatar"
          className="h-10 w-10 rounded-full hover:scale-150 duration-500"
        />
      </div>
    </div>
  );
};

export default Navbar;
