import SearchParamToggle from "./SearchParamToggle";

export default function ExtraFilters() {
  return (
    <div className="space-y-5">
      <h3 className="font-semibold">Extra filters</h3>
      <ul>
        <SearchParamToggle
          name="In-stock"
          urlParam="In-stock"
          type="checkbox"
        />
        <SearchParamToggle name="Popular" urlParam="Popular" type="checkbox" />
        <SearchParamToggle
          name="Recent-Products"
          urlParam="Recent-Products"
          type="checkbox"
        />
      </ul>
    </div>
  );
}
