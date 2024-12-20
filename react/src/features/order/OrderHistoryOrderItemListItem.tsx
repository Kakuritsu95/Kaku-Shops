import { Link } from "react-router-dom";
import { OrderItem } from "../../types/orderItemInterface";
import { formatPrice } from "../../utils/priceFormat";
import API_ROUTES from "../../api-routes/apiRoutes";

import { useEffect, useState } from "react";

import productService from "../../service/productService";
import RatingStars from "../../ui/RatingStars";
import useUpdateCartItemQuantity from "../../hooks/useUpdateCartItemQuantity";
import TextAccordion from "../../ui/TextAccordion";

export default function OrderHistoryOrderItemListItem({
  orderItem,
  canRateProductsInOrder,
}: {
  orderItem: OrderItem;
  canRateProductsInOrder: boolean;
}) {
  const [userProductRating, setUserProductRating] = useState<number>(0);
  const { addProductToCart, isAdding } = useUpdateCartItemQuantity();
  useEffect(() => {
    if (userProductRating)
      productService.rateProduct(orderItem.product.id, userProductRating);
  }, [orderItem.product.id, userProductRating]);
  return (
    <li className="py-5">
      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="flex h-[12rem] w-[12rem] items-center rounded bg-gray-100">
          <div
            className="mx-auto h-[9rem] w-[9rem] bg-cover bg-center hover:cursor-pointer"
            style={{
              backgroundImage: `url(${API_ROUTES.base}/${API_ROUTES.productImage.download(orderItem.product.images?.[0].id)})`,
            }}
          />
        </div>
        <div className="flex flex-1 flex-col space-y-3">
          <div className="flex justify-between">
            <h5 className="font-semibold">{orderItem.product.name}</h5>
            <span className="font-semibold">
              {formatPrice(orderItem.price)}
            </span>
          </div>
          <TextAccordion
            text={`${orderItem.product.description} hi guys this is something good to
            buy please buy hi guys this is something good to buy please buyhi
            guys this is something good to buy please buyhi guys this is
            something good to buy please buyhi guys this is something good to
            buy please buy hi guys this is something good to buy please buyhi
            guys this is something good to buy please buyhi guys this is
            something good to buy please buyhi guys this is something good to
            buy please buy `}
          ></TextAccordion>
          <div className="flex h-full items-end justify-between pb-1 text-blue-500">
            {canRateProductsInOrder && (
              <RatingStars
                defaultRating={orderItem.product.averageRating}
                readOnly={false}
                onRate={setUserProductRating}
              />
            )}
            <div className="ml-auto space-x-5">
              <Link to={`/product/${orderItem.product.id}`}>View product</Link>
              <button
                disabled={isAdding}
                onClick={() =>
                  addProductToCart({
                    productId: orderItem.product.id,
                    quantity: 1,
                  })
                }
              >
                Buy again
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
