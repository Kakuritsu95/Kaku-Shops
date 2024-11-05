import { Product } from "../../types/productInterface";
import InfoMessageTip from "../../ui/InfoMessageTip";
import RatingStars from "../../ui/RatingStars";

export default function ProductOverviewInfo({ product }: { product: Product }) {
  const isProductAvailable = product.inventory > 0;
  return (
    <div className="space-y-2">
      <h1 className="mb-3 text-3xl font-semibold">{product?.name}</h1>
      <span className="text-2xl font-medium">${product?.price}</span>
      <RatingStars rating={product.averageRating} />
      <InfoMessageTip type={isProductAvailable ? "success" : "fail"}>
        {isProductAvailable
          ? "Product is available!"
          : "Product is currently out of stock"}
      </InfoMessageTip>
      <p className="py-5 text-lg text-gray-800">
        {product.description}. The Zip Tote Basket is the perfect midpoint
        between shopping tote and comfy backpack. With convertible straps, you
        can hand carry, should sling, or backpack this convenient and spacious
        bag. The zip top and durable canvas construction keeps your goods
        protected for all-day use.
      </p>
      <span className="block font-medium text-gray-600">
        Brand: {product.brand}
      </span>
    </div>
  );
}
