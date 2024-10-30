import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import FilterSortSectionLabel from "./FilterSortLabel";

interface UrlParamsLabelProps {
  name: string;
  urlParam: string;
  type: "radio" | "checkbox";
}

export default function SearchParamToggle({
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
      <FilterSortSectionLabel isChecked={isChecked} name={name} type={type} />
    </li>
  );
}
