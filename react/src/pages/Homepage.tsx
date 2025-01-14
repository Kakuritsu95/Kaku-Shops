import { useQuery } from "@tanstack/react-query";
import CategoriesPreviewList from "../features/categories/CategoriesPreviewList";
import HomepageSection from "../ui/HomepageSection";
import { Product } from "../types/productInterface";
import productService from "../service/productService";
import ProductsCarousel from "../features/product/ProductsCarousel";
import FeaturesList from "../ui/FeaturesList";

export default function Homepage() {
  const { data: latestProducts, isLoading: isLoadingLatestProducts } = useQuery<
    Array<Product>
  >({
    queryKey: ["latestProducts"],
    queryFn: () => productService.getLatestProducts(),
  });
  const { data: bestSellerProducts, isLoading: isLoadingBestSellerProducts } =
    useQuery<Array<Product>>({
      queryKey: ["bestSellerProducts"],
      queryFn: () => productService.getBestSellerProducts(),
    });
  return (
    <div className="space-y-16">
      <HomepageSection title="Explore Categories">
        <CategoriesPreviewList />
      </HomepageSection>
      <HomepageSection title="Our Latest Products">
        {
          <ProductsCarousel
            isLoading={isLoadingLatestProducts}
            products={latestProducts}
          />
        }
      </HomepageSection>
      <HomepageSection title="Best Sellers">
        {
          <ProductsCarousel
            isLoading={isLoadingBestSellerProducts}
            products={bestSellerProducts}
          />
        }
      </HomepageSection>
      <HomepageSection title="Shop care-free">
        <FeaturesList />
      </HomepageSection>
    </div>
  );
}
