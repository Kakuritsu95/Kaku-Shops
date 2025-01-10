import { Product } from "../../types/productInterface";
import LoadingSkeletonsList from "../../ui/LoadingSkeletonsList";
import ProductSkeletonCard from "../../ui/ProductSkeletonCard";
import ProductListCard from "./ProductListCard";

export default function ProductList({
  products,
}: {
  products: Array<Product> | undefined;
}) {
  return (
    <ul className="flex flex-wrap sm:gap-3">
      {products ? (
        products.map((product) => (
          <ProductListCard product={product} key={product.id} />
        ))
      ) : (
        <LoadingSkeletonsList>
          <ProductSkeletonCard />
        </LoadingSkeletonsList>
      )}
    </ul>
  );
}
