import PriceRangeInput from "../../ui/PriceRangeInput";
import ExtraFilters from "./filter-sort/ExtraFilters";
import FilterByBrand from "./filter-sort/FilterByBrand";
import FilterByCategory from "./filter-sort/FilterByCategory";
import SortByPrice from "./filter-sort/SortByPrice";

export default function ProductFilterSortSection() {
  return (
    <form className="space-y-10">
      <h2 className="text-lg">Filters</h2>
      <FilterByCategory />
      <FilterByBrand />
      <SortByPrice />
      <ExtraFilters />
      <PriceRangeInput />
    </form>
  );
}
