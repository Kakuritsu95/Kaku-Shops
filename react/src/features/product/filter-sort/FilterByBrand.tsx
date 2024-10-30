import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import productService from "../../../service/productService";
import SearchParamToggle from "./SearchParamToggle";

export default function FilterByBrand() {
  const { categoryId } = useParams();
  const { data: brands } = useQuery({
    queryKey: [categoryId, "brands"],
    queryFn: () =>
      productService.getUniqueBrandsByCategoryId(String(categoryId)),
  });
  return (
    <div className="space-y-5">
      <h3 className="font-semibold">Brands</h3>
      <ul>
        {brands &&
          brands.map((brand) => (
            <SearchParamToggle
              key={brand}
              name={brand}
              urlParam="brand"
              type="checkbox"
            />
          ))}
      </ul>
    </div>
  );
}
