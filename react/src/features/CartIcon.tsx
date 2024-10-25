import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";

export default function CartIcon() {
  return (
    <div className="flex gap-3">
      <Link to="" className="relative rounded-full bg-orange-500 p-3">
        <BsCart3 size={21} color="white" />
        <span className="absolute right-[-3px] top-[-3px] h-5 w-5 rounded-full bg-red-500 text-center text-xs leading-5 text-white">
          1
        </span>
      </Link>
      <div className="hidden leading-tight lg:block">
        <p className="text-sm leading-5 text-gray-500">Cart</p>
        <div className="min-w-24">
          <span className="font-semibold text-gray-600">0,00 €</span>
          <MdArrowDropDown className="ml-0.5 inline" />
        </div>
      </div>
    </div>
  );
}
