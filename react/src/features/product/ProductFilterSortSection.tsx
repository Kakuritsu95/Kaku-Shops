import PriceRangeInput from "../../ui/PriceRangeInput";
import UrlParamsLabel from "../../ui/UrlParamsLabel";

const brandsMock = ["Adidas", "Puma", "Nike"];

export default function ProductFilterSortSection() {
  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };
  return (
    <aside>
      <form className="space-y-10" onChange={handleChange}>
        <h2 className="text-lg">Filters</h2>
        <div className="space-y-5">
          <h3 className="font-semibold">Brands</h3>
          <ul>
            {brandsMock.map((brand) => (
              <UrlParamsLabel
                key={brand}
                name={brand}
                urlParam="brand"
                type="checkbox"
              />
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <h3 className="font-semibold">Price</h3>
          <ul>
            <UrlParamsLabel
              name="Ascending"
              urlParam="SortPriceBy"
              type="radio"
            />
            <UrlParamsLabel
              name="Descending"
              urlParam="SortPriceBy"
              type="radio"
            />
          </ul>
        </div>
        <div className="space-y-5">
          <h3 className="font-semibold">Extra filters</h3>
          <ul>
            <UrlParamsLabel
              name="In-stock"
              urlParam="In-stock"
              type="checkbox"
            />
            <UrlParamsLabel name="Popular" urlParam="Popular" type="checkbox" />
            <UrlParamsLabel
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
