import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import categoryService from "../../../service/categoryService";
import { Category } from "../../../types/categoryInterface";
import FilterSortLabel from "./FilterSortLabel";
import { Link } from "react-router-dom";

export default function FilterByCategory() {
  const { categoryId } = useParams();
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAll,
  });

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
