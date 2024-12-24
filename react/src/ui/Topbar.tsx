import { Link } from "react-router-dom";
import { useUserDetails } from "../context/UserDetailsContext";
import UserOptions from "../features/user/UserOptions";

export default function Topbar() {
  const { email } = useUserDetails();

  return (
    <div className="flex items-center justify-center bg-orange-600 py-3 text-stone-200">
      <span className="hidden w-2/5 md:inline">(+30) 2103346732</span>
      <div className="flex space-x-2 divide-x divide-gray-300 text-center">
        <Link
          className="px-4 duration-100 hover:text-stone-50"
          to="/order-progress-form"
        >
          Order progress
        </Link>

        <Link to="/contact" className="px-4 duration-100 hover:text-stone-50">
          Contact us
        </Link>
        <div className="px-4 duration-100 hover:text-stone-50">
          {email ? (
            <UserOptions />
          ) : (
            <Link
              className="pr-4 duration-100 hover:text-stone-50"
              to="/auth/login"
            >
              Login/Signup
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
