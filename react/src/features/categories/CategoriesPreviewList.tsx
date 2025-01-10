import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import CategoryPreviewCard from "./CategoryPreviewCard";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import LoadingSkeletonsList from "../../ui/LoadingSkeletonsList";

import CategorySkeletonCard from "../../ui/CategorySkeletonCard";

export default function CategoriesPreviewList() {
  const categories = useCategories();
  return (
    <ul className="flex flex-col flex-wrap justify-between gap-y-4 sm:flex-row">
      {categories ? (
        categories
          .slice(0, 9)
          .map((category) => (
            <CategoryPreviewCard key={category.id} category={category} />
          ))
      ) : (
        <LoadingSkeletonsList numberOfSkeletonsToRender={6}>
          <CategorySkeletonCard />
        </LoadingSkeletonsList>
      )}

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
