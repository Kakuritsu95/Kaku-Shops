import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

interface ButtonProps {
  urlPath?: string;
  type?: "brand" | "checkout" | "transparent";
  size?: "small" | "medium" | "large" | "full";
  color?: "brand" | "blue" | "green" | "sky" | "black" | "transparent";
  onClick?: () => void;
  isSubmitting?: boolean;
  children?: ReactNode;
}

const sizes: { [key: string]: string } = {
  large: "px-28 py-3.5 md:px-20 md:w-80",
  full: "px-28 py-3.5",
  medium: "px-8 py-3",
  small: "px-7 py-3.5 text-sm w-32",
};
const colors: { [key: string]: string } = {
  brand: "bg-orange-600 hover:bg-orange-700",
  green: "bg-green-600 hover:bg-green-700",
  blue: "bg-blue-500 hover:bg-blue-600",
  sky: "bg-sky-600 hover:bg-sky-700",
  black: "bg-black hover:bg-gray-700",
  transparent: "hover:bg-gray-50",
};
const types: { [key: string]: string } = {
  brand: "mx-auto rounded font-medium text-white w-full",
  checkout: "mx-auto rounded-md font-semibold text-white text-[1.05rem] w-full",
  transparent:
    "mx-auto rounded-md font-semibold text-black border hover:bg-gray-100",
};

export function Button({
  urlPath,
  onClick,
  type = "brand",
  size = "large",
  color = "green",
  isSubmitting = false,
  children,
}: ButtonProps) {
  if (urlPath)
    return (
      <Link
        to={urlPath}
        className={`${types[type]} ${sizes[size]} ${colors[color]} inline-block text-center duration-100`}
      >
        {children}
      </Link>
    );
  return (
    <button
      onClick={onClick}
      disabled={isSubmitting}
      className={`${types[type]} ${colors[color]} ${sizes[size]} ${isSubmitting && "bg-gray-400 hover:cursor-not-allowed hover:bg-gray-400"} text-center duration-100`}
    >
      {isSubmitting ? <Spinner /> : children}
    </button>
  );
}
