import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <header>
      <div>topbar</div>
      <div>
        <div className="mx-auto flex items-center justify-around py-3">
          <Link to="/">
            <img src="eshoplogo.png" className="w-36" />
          </Link>
          <div className="relative w-2/4">
            <IoSearchOutline
              size={21}
              color="gray"
              className="absolute left-3 top-3"
            >
              2
            </IoSearchOutline>

            <input
              className="border w-full rounded-l-md border-gray-300 p-2.5 pl-10 outline-none duration-300 focus:border-sky-700 focus:shadow-outer"
              type="search"
              placeholder="Search..."
            />
          </div>

          <div className="w-1/4">Cart</div>
        </div>
      </div>

      <div>categories</div>
    </header>
  );
}
