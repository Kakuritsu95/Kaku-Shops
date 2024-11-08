import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  urlPath?: string;
  type?: "brand" | "checkout";
  size?: "small" | "medium" | "large" | "full";
  color?: "brand" | "blue" | "green" | "sky";
  onClick?: () => void;
  children?: ReactNode;
}

const sizes: { [key: string]: string } = {
  large: "px-28 py-3.5 md:px-20 md:w-80",
  full: "px-28 py-3.5",
  medium: "px-8 py-3",
};
const colors: { [key: string]: string } = {
  brand: "bg-orange-600 hover:bg-orange-700",
  green: "bg-green-600 hover:bg-green-700",
  blue: "bg-blue-500 hover:bg-blue-600",
  sky: "bg-sky-600 hover:bg-sky-700",
};
const types: { [key: string]: string } = {
  brand: "mx-auto rounded font-medium text-white w-full",
  checkout: "mx-auto rounded-md font-semibold text-white text-[1.05rem] w-full",
};

export function Button({
  urlPath,
  onClick,
  type = "brand",
  size = "large",
  color = "green",
  children,
}: ButtonProps) {
  if (urlPath)
    return (
      <Link
        to={urlPath}
        className={`${types[type]} ${sizes[size]} ${colors[color]} inline-block duration-100`}
      >
        {children}
      </Link>
    );
  return (
    <button
      onClick={onClick}
      className={`${types[type]} ${colors[color]} ${sizes[size]} duration-100`}
    >
      {children}
    </button>
  );
}
