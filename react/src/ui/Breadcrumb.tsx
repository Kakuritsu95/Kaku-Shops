import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Breadcrumb({
  routes,
}: {
  routes: Array<{ name: string; path?: string }>;
}) {
  return (
    <ul className="flex items-center gap-0.5 text-gray-500">
      <Link className="hover:text-black" to="/">
        Homepage
      </Link>
      <MdKeyboardArrowRight size={16} className="mt-0.5" />
      {routes.map((route, i) => {
        return (
          <div key={i} className="flex items-center text-sm sm:text-base">
            {route?.path ? (
              <>
                <Link className="hover:text-black" to={"/" + route.path}>
                  {route.name}
                </Link>
                <MdKeyboardArrowRight size={16} className="mt-0.5" />
              </>
            ) : (
              <span className="cursor-pointer text-gray-900">
                {routes.at(-1)?.name}
              </span>
            )}
          </div>
        );
      })}
    </ul>
  );
}
