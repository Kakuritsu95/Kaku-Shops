import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import FilterSortSectionLabel from "./FilterSortLabel";

interface UrlParamsLabelProps {
  name: string;
  urlParam: string;
  type: "radio" | "checkbox";
  value: string;
}

export default function SearchParamToggle({
  name,
  urlParam,
  type,
  value,
}: UrlParamsLabelProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  useEffect(() => {
    const currentValue = searchParams.get(urlParam);
    setIsChecked(currentValue === value);
  }, [searchParams, urlParam, name, value]);

  function setUrlParams(
    e: React.ChangeEvent<HTMLInputElement>,
    searchParam: string,
  ) {
    const currentParams = Object.fromEntries(searchParams);

    if (e.target.checked) {
      setSearchParams({ ...currentParams, [searchParam]: e.target.value });
    } else {
      const { [searchParam]: _, ...rest } = currentParams;
      setSearchParams(rest);
    }
  }

  return (
    <li>
      <input
        id={name}
        type={type}
        value={value}
        className="hidden"
        checked={isChecked}
        name={urlParam}
        onChange={(e) => setUrlParams(e, urlParam)}
      />
      <FilterSortSectionLabel isChecked={isChecked} name={name} type={type} />
    </li>
  );
}
