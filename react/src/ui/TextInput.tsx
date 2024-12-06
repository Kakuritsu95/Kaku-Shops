import { FieldValues } from "react-hook-form";
import { InputProps } from "../types/inputTypes";

export default function TextInput<T extends FieldValues>({
  field,
  maxLength,
  error,
  type = "text",
  labelName,
}: InputProps<T>) {
  return (
    <>
      <label className="text-[0.96rem] font-medium text-gray-700">
        <span className={`${error && "text-red-400"}`}>
          {error?.message || labelName}
        </span>
      </label>
      <input
        value={field.value}
        onChange={field.onChange}
        type={type}
        maxLength={maxLength}
        ref={field.ref}
        className="w-full rounded border border-gray-300 py-1.5 pl-3 shadow-sm outline-2 focus:shadow-none focus:outline-blue-700"
      />
    </>
  );
}
