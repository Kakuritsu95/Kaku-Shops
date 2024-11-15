import { GREEK_CITIES_WITH_POSTAL_CODES } from "../constants/GREEK_CITIES_WITH_POSTAL_CODES";
import { InputProps } from "../types/inputTypes";

export default function CityInput({
  field,
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
      <select
        value={field.value}
        onChange={field.onChange}
        className="appearance-none rounded border border-gray-300 py-1.5 pl-3 shadow-sm outline-2 focus:shadow-none focus:outline-blue-700"
      >
        <option value="" disabled>
          Select city
        </option>
        {GREEK_CITIES_WITH_POSTAL_CODES.map((el) => (
          <option key={el.postalCode}>{el.city}</option>
        ))}
      </select>
    </>
  );
}
