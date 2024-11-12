import { InputProps } from "../types/inputTypes";

export default function TextInput({
  field,
  maxLength,
  errorMessage,
  labelName,
}: InputProps) {
  return (
    <>
      <label className="text-[0.96rem] font-medium text-gray-700">
        <span className={`${errorMessage && "text-red-500"}`}>
          {errorMessage || labelName}
        </span>
      </label>
      <input
        value={field.value}
        onChange={field.onChange}
        type="text"
        maxLength={maxLength}
        ref={field.ref}
        className="rounded border border-gray-300 py-1.5 pl-3 shadow-sm outline-2 focus:shadow-none focus:outline-blue-700"
      />
    </>
  );
}
