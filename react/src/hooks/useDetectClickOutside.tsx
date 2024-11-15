import { useEffect, useRef } from "react";

export default function useDetectClickOutside(onClickOutside: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function detectClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    }
    document.addEventListener("click", detectClick, { capture: true });
    return () =>
      document.removeEventListener("click", detectClick, { capture: true });
  }, [onClickOutside]);
  return ref;
}
