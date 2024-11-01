import SearchParamToggle from "./SearchParamToggle";

export default function SortByPrice() {
  return (
    <div className="space-y-5">
      <h3 className="font-semibold">Price</h3>
      <ul>
        <SearchParamToggle
          name="Ascending"
          urlParam="sortBy"
          type="radio"
          value="price-asc"
        />
        <SearchParamToggle
          name="Descending"
          urlParam="sortBy"
          type="radio"
          value="price-desc"
        />
      </ul>
    </div>
  );
}
