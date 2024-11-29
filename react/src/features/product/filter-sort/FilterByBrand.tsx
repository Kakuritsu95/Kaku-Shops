import SearchParamToggle from "./SearchParamToggle";

export default function FilterByBrand({
  brands,
}: {
  brands: Array<string> | undefined;
}) {
  return (
    <div className="space-y-5">
      <h3 className="font-semibold">Brands</h3>
      {
        <ul>
          {brands?.map((brand) => (
            <SearchParamToggle
              key={brand}
              name={brand}
              urlParam="brand"
              type="checkbox"
              value={brand}
            />
          ))}
        </ul>
      }
    </div>
  );
}
