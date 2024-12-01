import { FaCheck } from "react-icons/fa6";

export default function OrderThankYouMessage({ orderId }: { orderId: number }) {
  return (
    <div className="flex items-center gap-5">
      <FaCheck
        className="rounded-full border-2 border-gray-800 p-1.5 text-gray-500"
        size={40}
      />
      <div>
        <span className="font-medium text-gray-500">Order #{orderId}</span>
        <p className="text-xl font-bold text-gray-800">
          Thank you for ordering!
        </p>
      </div>
    </div>
  );
}
