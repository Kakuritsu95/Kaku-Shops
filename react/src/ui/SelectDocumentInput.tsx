import { FieldValues } from "react-hook-form";
import { InputProps } from "../types/inputTypes";

export default function SelectDocumentTypeInput<T extends FieldValues>({
  value,
  field,
  error,
  labelName,
}: InputProps<T>) {
  return (
    <div className="flex items-center gap-5">
      <input
        onChange={field.onChange}
        checked={value == field.value}
        className="h-4 w-4 hover:cursor-pointer"
        value={value}
        name={field.name}
        type="radio"
      />
      <label className="text-[1rem] font-medium text-gray-700">
        <span className={`${error && "text-red-500"}`}>
          {error?.message || labelName}
        </span>
      </label>
    </div>
  );
}
