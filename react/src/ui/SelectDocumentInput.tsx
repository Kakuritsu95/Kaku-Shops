import { InputProps } from "../types/inputTypes";

export default function SelectDocumentTypeInput({
  value,
  field,
  errorMessage,
  labelName,
}: InputProps) {
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
        <span className={`${errorMessage && "text-red-500"}`}>
          {errorMessage || labelName}
        </span>
      </label>
    </div>
  );
}
