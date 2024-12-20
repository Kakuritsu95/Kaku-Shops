import { MdPendingActions } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { OrderStatus } from "../../types/orderInterface";

const orderStatuses = [
  { text: "PENDING", icon: MdPendingActions },
  { text: "PROCCESSING", icon: GrUserWorker },
  { text: "SHIPPING", icon: MdOutlineLocalShipping },
  { text: "DELIVERED", icon: IoHomeOutline },
];
export default function OrderProgressStepper({
  orderStatus,
}: {
  orderStatus: OrderStatus;
}) {
  const indexOfOrderState = orderStatuses.findIndex(
    (status) => status.text == orderStatus,
  );
  return (
    <div className="flex flex-1 sm:mx-5">
      {orderStatuses.map((status, i) => {
        const passedStatus = i <= indexOfOrderState;
        return (
          <>
            {i == 0 && (
              <div
                className={`h-3 w-3 rounded-full bg-orange-500 sm:h-7 sm:w-7`}
              />
            )}
            <div className="flex flex-1 flex-col space-y-10">
              <div className="flex items-center">
                <div
                  className={`relative h-1 flex-1 sm:h-1.5 ${passedStatus ? "bg-orange-500" : "bg-gray-300"}`}
                />
                <div
                  className={`h-3 w-3 rounded-full sm:h-7 sm:w-7 ${passedStatus ? "bg-orange-500" : "bg-gray-300"}`}
                />
              </div>

              <div className="flex flex-col items-center gap-2 text-center sm:flex-row">
                {<status.icon className="text-2xl sm:text-3xl" />}
                <span className="text-sm">{status.text.toLowerCase()}</span>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
