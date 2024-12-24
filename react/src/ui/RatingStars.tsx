import { useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStar } from "react-icons/io";

const RelevantRatingTexts: { [key: number]: string } = {
  1: "Very poor",
  2: "Poor",
  3: "Avarage",
  4: "Good",
  5: "Excellent",
};
interface starProps {
  quantity?: number;
  defaultRating: number;
  readOnly: boolean;
  onRate?: (rating: number) => void;
}
export default function RatingStars({
  quantity = 5,
  defaultRating = 0,
  readOnly = true,
  onRate,
}: starProps) {
  const starsArray = Array.from(Array(quantity), (_, i) => i + 1);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [submitedRating, setSubmitedRating] = useState<number>(0);
  let ratingToDisplay =
    submitedRating || (!readOnly && hoverRating) || defaultRating;

  return (
    <div className="flex">
      {starsArray.map((_, i) => {
        let StarIcon = IoIosStarOutline;
        if (ratingToDisplay > 0) {
          if (ratingToDisplay >= 1) {
            StarIcon = IoIosStar;
          } else {
            StarIcon = IoIosStarHalf;
          }
        }

        ratingToDisplay = Math.max(0, ratingToDisplay - 1);

        return (
          <button
            key={i}
            onMouseEnter={() => setHoverRating(i + 1)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => {
              if (readOnly) return;
              setSubmitedRating(i + 1);
              onRate?.(i + 1);
            }}
            className={`border-none bg-transparent p-0 outline-none ${readOnly && "cursor-default"}`}
          >
            <StarIcon className="text-orange-600" size={20} />
          </button>
        );
      })}
      {!readOnly && (
        <span className="ml-2 text-[0.9rem] font-semibold leading-5 text-gray-600">
          {RelevantRatingTexts[hoverRating]}
        </span>
      )}
    </div>
  );
}
