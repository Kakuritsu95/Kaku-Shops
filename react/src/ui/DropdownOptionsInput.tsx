import { FieldValues } from "react-hook-form";

import { InputProps } from "../types/inputTypes";
interface DropdownInputProps<T extends FieldValues> extends InputProps<T> {
  dropdownOptions: Array<string>;
}
export default function DropdownOptionsInput<T extends FieldValues>({
  field,
  error,
  dropdownOptions,
  labelName,
}: DropdownInputProps<T>) {
  if (dropdownOptions)
    return (
      <>
        <label className="text-[0.96rem] font-medium text-gray-700">
          <span className={`${error && "text-red-400"}`}>
            {error?.message || labelName}
          </span>
        </label>
        <select
          value={field.value || ""}
          onChange={field.onChange}
          className="appearance-none rounded border border-gray-300 py-1.5 pl-3 shadow-sm outline-2 focus:shadow-none focus:outline-blue-700"
        >
          <option value="" disabled>
            Select {labelName}
          </option>
          {dropdownOptions.map((el) => (
            <option key={el}>{el}</option>
          ))}
        </select>
      </>
    );
}
