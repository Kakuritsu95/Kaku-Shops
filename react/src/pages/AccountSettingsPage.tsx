import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

import APP_ROUTES from "../app-routes/appRoutes";

export default function AccountSettingsPage() {
  return (
    <div className="mx-auto w-full md:w-2/3">
      <nav className="border-b-2 border-gray-600 pb-3">
        <ul className="flex gap-1 text-sm font-semibold">
          <li>
            <NavLink
              className="block rounded px-3 py-1.5 duration-300 hover:bg-violet-500 hover:text-white"
              to={APP_ROUTES.ACCOUNT_DETAILS}
            >
              Details
            </NavLink>
          </li>
          <li>
            <NavLink
              className="block rounded px-3 py-1.5 duration-300 hover:bg-violet-500 hover:text-white"
              to={APP_ROUTES.ACCOUNT_ADDRESS}
            >
              Address
            </NavLink>
          </li>
          <li>
            <NavLink
              className="block rounded px-3 py-1.5 duration-300 hover:bg-violet-500 hover:text-white"
              to={APP_ROUTES.ACCOUNT_PASSWORD}
            >
              Change password
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="mt-8">
        <Outlet />
      </main>
    </div>
  );
}
