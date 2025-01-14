import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import CategoryPreviewCard from "./CategoryPreviewCard";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import LoadingSkeletonsList from "../../ui/LoadingSkeletonsList";

import CategorySkeletonCard from "../../ui/CategorySkeletonCard";
import APP_ROUTES from "../../app-routes/appRoutes";

export default function CategoriesPreviewList() {
  const { categories, isLoadingCategories } = useCategories();
  return (
    <ul className="flex flex-col flex-wrap justify-between gap-y-4 sm:flex-row">
      {isLoadingCategories ? (
        <LoadingSkeletonsList numberOfSkeletonsToRender={6}>
          <CategorySkeletonCard />
        </LoadingSkeletonsList>
      ) : (
        categories &&
        categories
          .slice(0, 9)
          .map((category) => (
            <CategoryPreviewCard key={category.id} category={category} />
          ))
      )}

      <Link
        to={`${APP_ROUTES.SEARCH}?keyword=""`}
        className="ml-auto text-blue-500 hover:underline"
      >
        <span>Explore all</span>
        <MdOutlineArrowRightAlt className="ml-1 inline-block" />
      </Link>
    </ul>
  );
}
