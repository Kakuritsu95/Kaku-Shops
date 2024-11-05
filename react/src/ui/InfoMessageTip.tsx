import { ReactNode } from "react";

interface InfoMessageTipProps {
  type: "success" | "fail" | "info";
  children: ReactNode;
}
export default function InfoMessageTip({
  type,
  children,
}: InfoMessageTipProps) {
  return (
    <span
      className={`inline-block rounded px-2.5 py-0.5 text-center text-sm font-medium ${type == "success" ? "bg-green-100 text-green-900" : type == "fail" ? "bg-red-100 text-red-900" : "bg-yellow-100 text-yellow-900"}`}
    >
      {children}
    </span>
  );
}
