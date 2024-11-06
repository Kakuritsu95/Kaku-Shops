import { useParams } from "react-router";
import { Category } from "../../../types/categoryInterface";
import FilterSortLabel from "./FilterSortLabel";
import { Link } from "react-router-dom";
import useCategories from "../../../hooks/useCategories";

export default function FilterByCategory() {
  const { categoryId } = useParams();
  const categories = useCategories();
  return (
    <div className="space-y-5">
      <h3 className="font-semibold">Categories</h3>
      <ul>
        {categories &&
          categories.map((category: Category) => (
            <Link key={category.id} to={`/products/category/${category.id}`}>
              <FilterSortLabel
                isChecked={category.id == Number(categoryId)}
                name={category.name}
                type="checkbox"
              />
            </Link>
          ))}
      </ul>
    </div>
  );
}
