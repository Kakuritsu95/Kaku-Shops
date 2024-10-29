import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PriceRangeInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState<string>("0");
  const [maxPrice, setMaxPrice] = useState<string>("500");

  return (
    <div className="flex flex-col">
      <label htmlFor="range" className="mb-2 text-lg">
        Price range:
      </label>
      <span>{minPrice}</span>
      <span>{maxPrice}</span>

      <input
        type="range"
        id="range"
        name="min"
        value={minPrice}
        min="12"
        max="100"
        onChange={(e) => {
          if (+minPrice < +maxPrice - 1) setMinPrice(e.target.value);
        }}
        className="range-min"
      />
      <input
        type="range"
        id="range"
        name="max"
        onChange={(e) => {
          if (+minPrice < +maxPrice - 1) setMaxPrice(e.target.value);
        }}
        value={maxPrice}
        className="range-max"
      />
    </div>
  );
}
