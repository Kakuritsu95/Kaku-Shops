import { Address } from "../../types/orderInterface";
import { Button } from "../../ui/Button";
import OrderConfirmationDetails from "./OrderConfirmationDetails";
import OrderThankYouMessage from "./OrderThankYouMessage";
import OrderUserUpdateNotificationBox from "./OrderUserUpdateNotificationBox";

interface OrderConfirmationInfoSectionProps {
  orderId: number;
  address: Address;
}
export default function OrderConfirmationInfoSection({
  orderId,
  address,
}: OrderConfirmationInfoSectionProps) {
  return (
    <div className="w-full space-y-9 lg:w-1/2 xl:w-2/3">
      <h1 className="text-xl font-semibold">Order confirmation</h1>
      <OrderThankYouMessage orderId={orderId} />
      <OrderUserUpdateNotificationBox />
      <OrderConfirmationDetails address={address} />
      <div className="sm:justify-self-end">
        <Button size="small" color="black">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
