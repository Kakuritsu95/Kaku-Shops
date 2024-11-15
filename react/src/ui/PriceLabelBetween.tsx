import { formatPrice } from "../utils/priceFormat";

interface PriceLabelBetweenProps {
  labelName: string;
  price: number;
  labelBold?: boolean;
}

export default function PriceLabelBetween({
  labelName,
  price,
  labelBold = false,
}: PriceLabelBetweenProps) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span
        className={`text-gray-700 ${labelBold && "font-medium text-black"}`}
      >
        {labelName}
      </span>
      <span className="font-medium text-gray-800">{formatPrice(price)}</span>
    </div>
  );
}
