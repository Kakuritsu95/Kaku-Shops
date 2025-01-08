import { useParams } from "react-router";
import { Category } from "../../../types/categoryInterface";
import FilterSortLabel from "./FilterSortLabel";
import { Link } from "react-router-dom";
import SearchParamToggle from "./SearchParamToggle";
import useToggleShowMoreButton from "../../../hooks/useToggleShowMoreButton";

export default function FilterByCategory({
  categories,
}: {
  categories: Array<Category> | undefined;
}) {
  const { categoryId } = useParams();
  const categoriesToDisplay = categories?.slice(0, 5);
  const showMoreCategories = categories?.slice(5);
  const { showMore, showMoreButton } = useToggleShowMoreButton("categories");

  return (
    <div className="space-y-5">
      <h3 className="font-semibold">Categories</h3>
      <ul className="max-h-96 min-h-28 overflow-y-auto">
        {categoriesToDisplay?.map((category: Category) =>
          categoryId ? (
            <Link key={category.id} to={`/products/category/${category.id}`}>
              <FilterSortLabel
                isChecked={category.id == Number(categoryId)}
                name={category.name}
                type="checkbox"
              />
            </Link>
          ) : (
            <SearchParamToggle
              name={category.name}
              key={category.id}
              urlParam="category"
              value={category.name}
              type="checkbox"
            />
          ),
        )}
        {showMore &&
          showMoreCategories?.map((category: Category) =>
            categoryId ? (
              <Link key={category.id} to={`/products/category/${category.id}`}>
                <FilterSortLabel
                  isChecked={category.id == Number(categoryId)}
                  name={category.name}
                  type="checkbox"
                />
              </Link>
            ) : (
              <SearchParamToggle
                name={category.name}
                key={category.id}
                urlParam="category"
                value={category.name}
                type="checkbox"
              />
            ),
          )}
      </ul>
      {showMoreCategories && showMoreCategories.length > 0 && showMoreButton}
    </div>
  );
}
