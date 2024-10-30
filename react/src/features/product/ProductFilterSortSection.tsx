import PriceRangeInput from "../../ui/PriceRangeInput";
import FilterByBrand from "./filter-sort/FilterByBrand";
import FilterByCategory from "./filter-sort/FilterByCategory";
import SearchParamToggle from "./filter-sort/SearchParamToggle";

export default function ProductFilterSortSection() {
  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
  };
  return (
    <aside>
      <form className="space-y-10" onChange={handleChange}>
        <h2 className="text-lg">Filters</h2>
        <FilterByCategory />
        <FilterByBrand />

        <div className="space-y-5">
          <h3 className="font-semibold">Price</h3>
          <ul>
            <SearchParamToggle
              name="Ascending"
              urlParam="SortPriceBy"
              type="radio"
            />
            <SearchParamToggle
              name="Descending"
              urlParam="SortPriceBy"
              type="radio"
            />
          </ul>
        </div>
        <div className="space-y-5">
          <h3 className="font-semibold">Extra filters</h3>
          <ul>
            <SearchParamToggle
              name="In-stock"
              urlParam="In-stock"
              type="checkbox"
            />
            <SearchParamToggle
              name="Popular"
              urlParam="Popular"
              type="checkbox"
            />
            <SearchParamToggle
              name="Recent-Products"
              urlParam="Recent-Products"
              type="checkbox"
            />
          </ul>
        </div>
        <PriceRangeInput />
      </form>
    </aside>
  );
}
