import { IoSearchOutline } from "react-icons/io5";

export default function Searchbar({ smallScreen }: { smallScreen?: boolean }) {
  return (
    <div
      className={`relative ${smallScreen ? "mx-4 lg:hidden" : "hidden w-2/4 lg:block"}`}
    >
      <IoSearchOutline
        size={21}
        color="gray"
        className="absolute left-3 top-3"
      />
      <input
        className="w-full rounded-l-md border border-gray-300 p-2.5 pl-10 outline-none duration-300 focus:border-sky-700 focus:shadow-outer"
        type="search"
        placeholder="Search..."
      />
    </div>
  );
}
