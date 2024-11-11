import { ReactNode } from "react";

export default function FormSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-1 space-y-5 border-b pb-12">
      <h2 className="pb-3 text-lg font-medium text-gray-800">{title}</h2>
      {children}
    </div>
  );
}
