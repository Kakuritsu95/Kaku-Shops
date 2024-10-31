import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ProductBreadcrumb({
  categoryName,
}: {
  categoryName: string | undefined;
}) {
  return (
    <ul className="flex items-center gap-0.5 text-gray-500">
      <Link className="hover:text-black" to="/">
        Homepage
      </Link>
      <MdKeyboardArrowRight size={16} className="mt-0.5" />
      <Link className="hover:text-black" to="/categories">
        Categories
      </Link>
      <MdKeyboardArrowRight size={16} className="mt-0.5" />
      <span className="cursor-pointer text-gray-900">{categoryName}</span>
    </ul>
  );
}
