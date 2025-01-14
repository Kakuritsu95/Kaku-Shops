import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface PriceRange {
  minPrice: string;
  maxPrice: string;
}
export default function PriceFilters() {
  const [priceRange, setPriceRange] = useState<PriceRange>({
    minPrice: "",
    maxPrice: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="flex flex-col space-y-5 sm:w-52">
      <label className="relative">
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-2 text-xs font-semibold text-gray-700">
          Min price
        </span>
        <input
          value={priceRange?.minPrice}
          onChange={(e) => {
            if (e.target.value && !isFinite(+e.target.value)) return;
            if (+e.target.value < 0) return;
            if (+e.target.value > 100000)
              return setPriceRange({
                ...priceRange,
                minPrice: "99999",
              });
            setPriceRange({
              ...priceRange,
              minPrice: e.target.value,
            });
          }}
          type="text"
          className="w-full rounded border-2 border-gray-700 py-1 pl-2 focus:outline-none"
        />
        <span className="absolute right-3 top-1.5 font-semibold text-gray-500">
          €
        </span>
      </label>
      <label className="relative">
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-2 text-xs font-semibold text-gray-700">
          Max price
        </span>
        <input
          onChange={(e) => {
            if (e.target.value && !isFinite(+e.target.value)) return;
            if (+e.target.value > 100000)
              return setPriceRange({
                ...priceRange,
                maxPrice: "99999",
              });
            setPriceRange({
              ...priceRange,
              maxPrice: e.target.value,
            });
          }}
          value={priceRange?.maxPrice}
          type="text"
          className="w-full rounded border-2 border-gray-700 py-1 pl-2 focus:outline-none"
        />
        <span className="absolute right-3 top-1.5 font-semibold text-gray-500">
          €
        </span>
      </label>

      <button
        type="button"
        onClick={() => {
          if (
            +priceRange.minPrice > +priceRange.maxPrice ||
            priceRange.minPrice == "" ||
            priceRange.maxPrice == ""
          )
            return;
          setSearchParams({
            ...Object.fromEntries(searchParams),
            ["minPrice"]: priceRange.minPrice,
            ["maxPrice"]: priceRange.maxPrice,
            page: "1",
          });
        }}
        className="rounded bg-orange-500 px-2 py-2 text-sm font-semibold text-gray-50"
      >
        Submit price range
      </button>
    </div>
  );
}
