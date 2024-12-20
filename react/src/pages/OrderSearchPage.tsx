import { ChangeEvent, FormEvent, useState } from "react";

import { useNavigate } from "react-router";
import { Button } from "../ui/Button";

const refCodeInvalidMessage =
  "Please enter a valid reference code (36 characters)";

export default function OrderSearchPage() {
  const [orderRefCode, setOrderRefCode] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (orderRefCode.length != 36) {
          setIsError(true);
          return;
        }
        navigate(`/order-progress/${orderRefCode}`);
      }}
      className="mx-auto mt-36 flex flex-col space-y-7 text-center sm:w-2/3 xl:w-2/5"
    >
      <div>
        <h2 className="mb-3 text-xl font-semibold text-orange-500 sm:text-3xl">
          Track your order
        </h2>
        <label className="text-gray-500">
          Enter an order number to find your order details.
        </label>
        <span className="block h-1 text-red-500">
          {isError && refCodeInvalidMessage}
        </span>
      </div>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setIsError(false);
          setOrderRefCode(e.target.value);
        }}
        className="rounded border p-2.5 px-3 focus:outline-blue-500"
      />

      <Button size="full" type="brand" color="blue">
        Track order
      </Button>
    </form>
  );
}
