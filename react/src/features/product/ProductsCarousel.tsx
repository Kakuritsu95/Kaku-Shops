import { Product } from "../../types/productInterface";
import { useSlider } from "../../hooks/useSlider";

import ProductListCard from "./ProductListCard";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function ProductsCarousel({
  products,
  groupNumber = 3,
}: {
  products: Array<Product>;
  groupNumber?: number;
}) {
  const {
    sliderContainerRef,
    indexOfItemsGroupToDisplay,
    setIndexOfItemsGroupToDisplay,
  } = useSlider();

  const groupedProducts = products.reduce(
    (acc: Array<Array<Product>>, curr: Product, i) => {
      if (i == 0) acc.push([curr]);
      else if (i % groupNumber != 0) acc[acc.length - 1]?.push(curr);
      else acc.push([curr]);
      return acc;
    },
    [],
  );

  return (
    <div className="relative space-y-5">
      <ul className="flex justify-center gap-5">
        {groupedProducts.map((_, i) => (
          <div
            className={`h-2 w-2 rounded-full ${i === indexOfItemsGroupToDisplay ? "bg-gray-600" : "bg-gray-200"}`}
          />
        ))}
      </ul>
      <div className="mx-auto flex flex-nowrap overflow-hidden">
        {indexOfItemsGroupToDisplay > 0 && (
          <button
            onClick={() => setIndexOfItemsGroupToDisplay((i) => i - 1)}
            className="hover:shadow-borderLg absolute -left-3 top-1/3 z-10 flex rounded-full bg-gray-50 p-2 text-gray-700 shadow-border"
          >
            <MdOutlineKeyboardArrowLeft size={24} />
          </button>
        )}
        <ul ref={sliderContainerRef} className="flex w-full duration-500">
          {groupedProducts.map((groupOfProducts, index) => (
            <li key={index} className="flex flex-shrink-0 basis-full">
              <ul className="flex flex-1 flex-shrink-0 flex-col justify-around text-center sm:flex-row sm:text-start">
                {groupOfProducts.map((product) => (
                  <ProductListCard product={product} />
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {indexOfItemsGroupToDisplay < groupedProducts.length - 1 && (
          <button
            onClick={() => setIndexOfItemsGroupToDisplay((i) => i + 1)}
            className="hover:shadow-borderLg absolute -right-3 top-1/3 flex rounded-full bg-gray-50 p-2 text-gray-700 shadow-border"
          >
            <MdOutlineKeyboardArrowRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
