import { useParams } from "react-router";
import { Category } from "../../../types/categoryInterface";
import FilterSortLabel from "./FilterSortLabel";
import { Link } from "react-router-dom";
import SearchParamToggle from "./SearchParamToggle";

export default function FilterByCategory({
  categories,
}: {
  categories: Array<Category> | undefined;
}) {
  const { categoryId } = useParams();
  return (
    <div className="space-y-5">
      <h3 className="font-semibold">Categories</h3>
      <ul>
        {categoryId ? (
          categories?.map((category: Category) => (
            <Link key={category.id} to={`/products/category/${category.id}`}>
              <FilterSortLabel
                isChecked={category.id == Number(categoryId)}
                name={category.name}
                type="checkbox"
              />
            </Link>
          ))
        ) : (
          <ul>
            {categories?.map((category) => (
              <SearchParamToggle
                name={category.name}
                key={category.id}
                urlParam="category"
                value={category.name}
                type="checkbox"
              />
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
}
