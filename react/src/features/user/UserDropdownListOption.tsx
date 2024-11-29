import { ReactNode } from "react";

export default function UserDropdownListOption({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <li
      onClick={onClick}
      className="flex w-full items-center justify-between hover:text-blue-500"
    >
      {children}
    </li>
  );
}
