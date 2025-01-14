import { Product } from "../../types/productInterface";
import LoadingSkeletonsList from "../../ui/LoadingSkeletonsList";
import ProductSkeletonCard from "../../ui/ProductSkeletonCard";
import ProductListCard from "./ProductListCard";

export default function ProductList({
  products,
  isLoadingProducts,
}: {
  products: Array<Product> | undefined;
  isLoadingProducts: boolean;
}) {
  return (
    <ul className="flex flex-wrap sm:gap-3">
      {isLoadingProducts ? (
        <LoadingSkeletonsList>
          <ProductSkeletonCard />
        </LoadingSkeletonsList>
      ) : (
        products?.map((product) => (
          <ProductListCard product={product} key={product.id} />
        ))
      )}
    </ul>
  );
}
