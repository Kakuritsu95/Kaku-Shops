import { Address } from "../../types/orderInterface";

export default function OrderConfirmationDetails({
  address,
}: {
  address: Address;
}) {
  return (
    <div className="rounded border-2 border-b-0 border-gray-100 font-medium text-gray-500">
      <div className="flex space-x-5 border-b-2 border-gray-100 p-4 py-5">
        <h3>Details</h3>
      </div>
      <div className="flex space-x-5 border-b-2 border-gray-100 p-4 py-5">
        <h3>Address</h3>
        <div className="flex flex-col">
          <span>{address?.address}</span>
          <span>{address?.city}</span>
          <span>{address?.postalCode}</span>
        </div>
      </div>
      <div className="flex space-x-5 border-b-2 border-gray-100 p-4 py-5">
        <h3>Payment</h3>
        <span>Cash on delivery</span>
      </div>
    </div>
  );
}
