import { Category } from "../../types/categoryInterface";
import ExtraFilters from "./filter-sort/ExtraFilters";
import FilterByBrand from "./filter-sort/FilterByBrand";
import FilterByCategory from "./filter-sort/FilterByCategory";
import SortByPrice from "./filter-sort/SortByPrice";

export default function ProductFilterSortSection({
  categories,
  brands,
}: {
  categories: Array<Category> | undefined;
  brands: Array<string> | undefined;
}) {
  return (
    <form className="space-y-10">
      <h2 className="text-lg">Filters</h2>
      <FilterByCategory categories={categories} />
      <FilterByBrand brands={brands} />
      <SortByPrice />
      <ExtraFilters />
      {/* <PriceRangeInput /> */}
    </form>
  );
}
