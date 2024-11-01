import SearchParamToggle from "./SearchParamToggle";

export default function ExtraFilters() {
  return (
    <div className="space-y-5">
      <h3 className="font-semibold">Extra filters</h3>
      <ul>
        <SearchParamToggle
          name="In stock"
          urlParam="inStock"
          type="checkbox"
          value="true"
        />
        <SearchParamToggle
          name="Popular"
          urlParam="popular"
          type="checkbox"
          value="true"
        />
        <SearchParamToggle
          name="Recent Products"
          urlParam="newArrivals"
          type="checkbox"
          value="true"
        />
      </ul>
    </div>
  );
}
