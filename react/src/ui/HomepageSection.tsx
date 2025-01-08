import { ReactNode } from "react";

export default function HomepageSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-12 flex items-center gap-6">
        <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          {title}
        </h2>
        <hr className="block flex-1 border-black" />
      </div>
      <div>{children}</div>
    </section>
  );
}
