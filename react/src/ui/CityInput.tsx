import { ControllerRenderProps } from "react-hook-form";
import { GREEK_CITIES_WITH_POSTAL_CODES } from "../constants/GREEK_CITIES_WITH_POSTAL_CODES";
import { OrderFormValues } from "../types/orderForm";
interface InputProps {
  labelName?: string;
  field: ControllerRenderProps<OrderFormValues, keyof OrderFormValues>;
}
export default function CityInput({ labelName, field }: InputProps) {
  return (
    <>
      <label className="block">{labelName}</label>
      <select
        value={field.value}
        onChange={field.onChange}
        className="appearance-none rounded border border-gray-300 py-1.5 pl-3 shadow-sm outline-2 focus:shadow-none focus:outline-blue-700"
      >
        {GREEK_CITIES_WITH_POSTAL_CODES.map((el) => (
          <option>{el.city}</option>
        ))}
      </select>
    </>
  );
}
