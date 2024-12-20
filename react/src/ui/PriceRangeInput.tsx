import { useState } from "react";

export default function PriceRangeInput() {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

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
        min={0}
        max={maxPrice - 1}
        onChange={(e) => {
          if (maxPrice - 60 > minPrice) setMinPrice(+e.target.value);
        }}
        className="range-min"
      />
      <input
        type="range"
        id="range"
        name="max"
        onChange={(e) => {
          if (maxPrice - 60 > minPrice) setMaxPrice(+e.target.value);
        }}
        min={1}
        max={2000}
        value={maxPrice}
        className="range-max"
      />
    </div>
  );
}
