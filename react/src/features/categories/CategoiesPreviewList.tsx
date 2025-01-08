import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import CategoryPreviewCard from "./CategoryPreviewCard";
import { MdOutlineArrowRightAlt } from "react-icons/md";

export default function CategoriesPreviewList() {
  const categories = useCategories();
  return (
    <ul className="flex flex-col flex-wrap justify-between gap-y-4 sm:flex-row">
      {categories
        ?.slice(0, 6)
        .map((category) => (
          <CategoryPreviewCard key={category.id} category={category} />
        ))}
      <Link
        to="/search?keyword="
        className="ml-auto text-blue-500 hover:underline"
      >
        <span>Explore all</span>
        <MdOutlineArrowRightAlt className="ml-1 inline-block" />
      </Link>
    </ul>
  );
}
