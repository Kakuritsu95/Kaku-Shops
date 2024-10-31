import SearchParamToggle from "./SearchParamToggle";

export default function SortByPrice() {
  return (
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
  );
}
