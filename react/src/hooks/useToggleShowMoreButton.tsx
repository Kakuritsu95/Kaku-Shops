import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export default function useToggleShowMoreButton(showWhat: string) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const showMoreButton = (
    <button
      type="button"
      className="mt-5 flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
      onClick={() => setShowMore((show) => !show)}
    >
      {showMore ? `Show less ${showWhat}` : `Show all ${showWhat}`}
      {showMore ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
    </button>
  );
  return { showMore, showMoreButton };
}
