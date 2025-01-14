import { useRef } from "react";

interface SelectCartItemQuantityProps {
  productId: number;
  maxQuantity?: number;
  initialQuantity: number;
  updateCartItemQuantity: ({
    productId,
    quantity,
  }: {
    productId: number;
    quantity: number;
  }) => void;
}

export default function SelectCartItemQuantity({
  productId,
  maxQuantity = 100,
  initialQuantity,
  updateCartItemQuantity,
}: SelectCartItemQuantityProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const quantityRangeArray = Array.from(Array(maxQuantity), (_, i) => i + 1);

  return (
    <select
      ref={selectRef}
      id="quantity"
      defaultValue={initialQuantity}
      className="h-9 w-16 appearance-none rounded-lg border border-gray-500 px-2 text-sm text-gray-900 focus:outline-indigo-400"
      onChange={(e) =>
        updateCartItemQuantity({
          productId,
          quantity: Number(e.target.value),
        })
      }
    >
      {quantityRangeArray.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
