import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function UserDropdownListOption({
  children,
  onClick,
  to,
}: {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
}) {
  if (onClick)
    return (
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between hover:text-blue-500"
      >
        {children}
      </button>
    );
  else if (to)
    return (
      <Link
        className="flex w-full items-center justify-between hover:text-blue-500"
        to={to}
      >
        {children}
      </Link>
    );
}
