import { FaCheck } from "react-icons/fa6";

export default function FilterSortLabel({
  isChecked,
  name,
  type,
}: {
  isChecked: boolean;
  name: string;
  type: "radio" | "checkbox";
}) {
  return (
    <label htmlFor={name} className="flex cursor-pointer items-center gap-2.5">
      <div
        className={`flex h-[18px] w-[18px] items-center border border-gray-400 ${type == "radio" ? "rounded-full" : "rounded"} ${isChecked && "border-none bg-gray-800"}`}
      >
        {isChecked &&
          (type == "radio" ? (
            <div className="ms-1.5 h-1.5 w-1.5 rounded-full bg-white" />
          ) : (
            <FaCheck size={13} className="ms-[3px] font-bold text-white" />
          ))}
      </div>
      <span>{name}</span>
    </label>
  );
}
