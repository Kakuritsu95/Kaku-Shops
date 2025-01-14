import { Category } from "../../types/categoryInterface";
import ExtraFilters from "./filter-sort/ExtraFilters";
import FilterByBrand from "./filter-sort/FilterByBrand";
import FilterByCategory from "./filter-sort/FilterByCategory";
import PriceFilters from "./filter-sort/PriceFilters";
import SortByPrice from "./filter-sort/SortByPrice";

export default function ProductFilterSortSection({
  categories,
  brands,
  isLoadingCategories,
  isLoadingBrands,
}: {
  categories: Array<Category> | undefined;
  brands: Array<string> | undefined;
  isLoadingCategories?: boolean;
  isLoadingBrands?: boolean;
}) {
  return (
    <form className="space-y-10">
      <h2 className="text-lg">Filters</h2>
      <FilterByCategory
        categories={categories}
        isLoadingCategories={isLoadingCategories}
      />
      <FilterByBrand brands={brands} isLoadingBrands={isLoadingBrands} />
      <SortByPrice />
      <ExtraFilters />
      <PriceFilters />
    </form>
  );
}
