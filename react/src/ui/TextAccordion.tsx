import { useState } from "react";

export default function TextAccordion({
  text,
  wordsQuantity = 9,
  toggleSmallScreensOnly,
}: {
  text: string;
  wordsQuantity?: number;
  toggleSmallScreensOnly?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const numberOfWords = text.split(" ").length;

  const contractedText =
    text.split(" ").slice(0, wordsQuantity).join(" ") + "...";
  return (
    <>
      <div className={toggleSmallScreensOnly ? "sm:hidden" : ""}>
        {
          <p className="mr-2 inline text-wrap text-sm sm:text-base">
            {isExpanded ? text : contractedText}
          </p>
        }
        <button
          onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
          className="text-sm font-semibold text-blue-500 underline"
        >
          {numberOfWords > wordsQuantity &&
            (isExpanded ? "show less" : "Read more")}
        </button>
      </div>
      {toggleSmallScreensOnly && <p className="hidden sm:block">{text}</p>}
    </>
  );
}
