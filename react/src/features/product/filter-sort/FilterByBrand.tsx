import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import productService from "../../../service/productService";
import SearchParamToggle from "./SearchParamToggle";

export default function FilterByBrand() {
  const { categoryId } = useParams();
  const { data: brands, isLoading } = useQuery<Array<string>>({
    queryKey: [categoryId, "brands"],
    queryFn: () =>
      productService.getUniqueBrandsByCategoryId(String(categoryId)),
  });

  return (
    <div className="space-y-5">
      <h3 className="font-semibold">Brands</h3>
      {!isLoading && (
        <ul>
          {brands &&
            brands.map((brand) => (
              <SearchParamToggle
                key={brand}
                name={brand}
                urlParam="brand"
                type="checkbox"
                value={brand}
              />
            ))}
        </ul>
      )}
    </div>
  );
}
