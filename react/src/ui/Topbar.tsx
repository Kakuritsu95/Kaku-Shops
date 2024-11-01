import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="flex items-center justify-center bg-orange-600 py-3 text-stone-200">
      <span className="hidden w-2/5 md:inline">(+30) 2103346732</span>
      <div className="space-x-2 divide-x divide-gray-300 text-center">
        <Link className="pr-4 duration-100 hover:text-stone-50" to="/">
          Login/Signup
        </Link>
        <Link className="px-4 duration-100 hover:text-stone-50" to="/">
          Order progress
        </Link>

        <Link to="" className="px-4 duration-100 hover:text-stone-50">
          Contact us
        </Link>
      </div>
    </div>
  );
}