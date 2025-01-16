import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserDetailsContext";
import UserOptions from "../features/user/UserOptions";
import APP_ROUTES from "../app-routes/appRoutes";

export default function Topbar() {
  const { email } = useUserContext();

  return (
    <div className="flex items-center justify-center bg-orange-600 py-3 text-stone-100">
      <span className="hidden w-2/5 md:inline">(+30) 2103346732</span>
      <div className="flex divide-x divide-gray-300">
        <Link
          className="pr-4 duration-100 hover:text-stone-50 sm:px-4"
          to={APP_ROUTES.ORDER_SEARCH}
        >
          Order progress
        </Link>

        <Link
          to={APP_ROUTES.CONTACT_US}
          className="px-4 duration-100 hover:text-stone-50 sm:px-4"
        >
          Contact us
        </Link>
        <div className="pl-4 duration-100 hover:text-stone-50 sm:px-4">
          {email ? (
            <UserOptions />
          ) : (
            <Link
              className="duration-100 hover:text-stone-50"
              to={APP_ROUTES.LOGIN}
            >
              Login/Signup
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
