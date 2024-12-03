import { useState, useEffect } from "react";
export function useDebounceKeyword(
  searchKeyword: string,
  searchDelay: number = 300,
) {
  const [debouncedKeyword, setDebouncedKeyword] = useState(searchKeyword);

  useEffect(() => {
    if (searchKeyword.length < 3) return;
    const timeoutId = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
    }, searchDelay);
    return () => clearTimeout(timeoutId);
  }, [searchKeyword, searchDelay]);
  return debouncedKeyword;
}
