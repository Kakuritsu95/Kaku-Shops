import { Product } from "../../types/productInterface";
import ProductListCard from "./ProductListCard";

export default function ProductList({
  products,
}: {
  products: Array<Product>;
}) {
  return (
    <ul className="flex flex-wrap sm:gap-3">
      {products.map((product) => (
        <ProductListCard product={product} key={product.id} />
      ))}
    </ul>
  );
}
