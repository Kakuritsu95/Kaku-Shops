import { ReactNode } from "react";

export default function UserDropdownListOption({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <li className="flex w-full items-center justify-between hover:text-blue-500">
      {children}
    </li>
  );
}
