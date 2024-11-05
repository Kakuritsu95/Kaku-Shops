import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import ProductList from "./ProductList";
import { Product } from "../../types/productInterface";
import productService from "../../service/productService";
import { PagedData } from "../../types/PagedData";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../../ui/Breadcrumb";

export default function ProductsDisplay() {
  const { categoryId = "" } = useParams();
  const [searchParams] = useSearchParams();
  const { data: products, isLoading } = useQuery<PagedData<Product>>({
    queryKey: [categoryId, ...Array.from(searchParams.entries()).sort()],
    queryFn: () =>
      productService.getByCategoryIdAndSearchQuery(
        categoryId,
        searchParams.toString(),
      ),
  });

  if (products == undefined) return;

  const selectedCategory = products.content[0].category.name;
  return (
    <div className="w-full space-y-7">
      <Breadcrumb routes={[{ name: selectedCategory }]} />
      <div className="divide- flex items-center gap-2.5">
        <h2 className="text-2xl font-semibold">{selectedCategory}</h2>
        <div className="ml-1 mt-1 h-6 border-l border-gray-300" />
        <span className="mt-1.5">{products.content.length} products</span>
      </div>
      <ProductList products={products?.content} />
    </div>
  );
}
