import { OrderFormValues } from "../types/orderForm";
import { ControllerRenderProps } from "react-hook-form";
interface TextInputProps {
  labelName: string;
  field: ControllerRenderProps<OrderFormValues, keyof OrderFormValues>;
}

export default function TextInput({ labelName, field }: TextInputProps) {
  return (
    <>
      <label className="text-[0.96rem] font-medium text-gray-700">
        {labelName}
      </label>
      <input
        value={field.value}
        onChange={field.onChange}
        ref={field.ref}
        className="rounded border border-gray-300 py-1.5 pl-3 shadow-sm outline-2 focus:shadow-none focus:outline-blue-700"
      />
    </>
  );
}
