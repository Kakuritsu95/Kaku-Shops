import { Product } from "../../types/productInterface";
import ProductCard from "./ProductCard";

export default function ProductList({
  products,
}: {
  products: Array<Product>;
}) {
  return (
    <ul className="flex flex-wrap sm:gap-3">
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </ul>
  );
}
