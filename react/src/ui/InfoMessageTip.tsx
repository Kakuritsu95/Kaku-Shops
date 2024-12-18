import { ReactNode } from "react";

interface InfoMessageTipProps {
  type: "success" | "fail" | "info";
  size?: "small" | "medium" | "large";
  children: ReactNode;
}
const sizes = {
  small: "text-sm px-2.5 py-0.5",
  medium: "text-base px-3.5 py-1",
  large: "text-lg px-4 py-1.5",
};
export default function InfoMessageTip({
  type,
  size = "small",
  children,
}: InfoMessageTipProps) {
  return (
    <span
      className={`inline-block rounded text-center font-medium ${sizes[size]} ${type == "success" ? "bg-green-100 text-green-900" : type == "fail" ? "bg-red-100 text-red-900" : "bg-yellow-100 text-yellow-900"}`}
    >
      {children}
    </span>
  );
}
