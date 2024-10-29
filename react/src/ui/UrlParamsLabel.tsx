import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

interface UrlParamsLabelProps {
  name: string;
  urlParam: string;
  type: "radio" | "checkbox";
}

export default function UrlParamsLabel({
  name,
  type,
  urlParam,
}: UrlParamsLabelProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  useEffect(() => {
    const currentValue = searchParams.get(urlParam);
    setIsChecked(currentValue === name || currentValue === "true");
  }, [searchParams, urlParam, name]);

  function setUrlParams(
    e: React.ChangeEvent<HTMLInputElement>,
    filterName: string,
  ) {
    const currentParams = Object.fromEntries(searchParams);

    if (e.target.checked) {
      setSearchParams({ ...currentParams, [filterName]: e.target.value });
    } else {
      const { [filterName]: _, ...rest } = currentParams;
      setSearchParams(rest);
    }
  }

  return (
    <li>
      <input
        id={name}
        type={type}
        value={name == urlParam ? "true" : name}
        className="hidden"
        checked={isChecked}
        name={urlParam}
        onChange={(e) => setUrlParams(e, urlParam)}
      />
      <label
        htmlFor={name}
        className="flex cursor-pointer items-center gap-2.5"
      >
        <div
          className={`flex h-[18px] w-[18px] items-center border border-gray-400 ${type == "radio" ? "rounded-full" : "rounded"} ${isChecked && "border-none bg-gray-800"}`}
        >
          {isChecked &&
            (type == "radio" ? (
              <div className="ms-1.5 h-1.5 w-1.5 rounded-full bg-white" />
            ) : (
              <FaCheck size={13} className="ms-0.5 font-bold text-white" />
            ))}
        </div>
        <span>{name}</span>
      </label>
    </li>
  );
}
