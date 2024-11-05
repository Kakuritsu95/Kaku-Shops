import { IoIosStarOutline } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
interface starProps {
  quantity?: number;
  rating: number;
}
export default function RatingStars({ quantity = 5, rating = 0 }: starProps) {
  const starsArray = Array.from(Array(quantity), (_, i) => i + 1);

  return (
    <div className="flex">
      {starsArray.map((_, i) => {
        console.log(rating);
        if (rating <= 0)
          return <IoIosStarOutline className="text-orange-600" size={20} />;
        if (rating >= 1) {
          --rating;
          return <IoIosStar className="text-orange-600" size={20} />;
        } else {
          --rating;
          return <IoIosStarHalf className="text-orange-600" size={20} />;
        }
      })}
    </div>
  );
}