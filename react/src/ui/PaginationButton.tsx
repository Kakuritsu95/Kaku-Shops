export default function PaginationButton({
  children,
  isCurrentPage,
  onClick,
}: {
  children: number | string;
  isCurrentPage?: boolean;
  onClick?: () => void;
}) {
  if (children != "...")
    return (
      <button
        className={`rounded border px-2 py-2 text-xs font-medium text-gray-700 hover:border-sky-600 hover:text-sky-600 sm:px-4 sm:py-3 md:text-base lg:px-5 lg:py-2.5 ${isCurrentPage && "border-sky-600 text-sky-700"}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  else
    return (
      <div className="inline-block rounded border px-2 py-2 text-xs font-medium text-gray-700 sm:px-4 sm:py-3 md:text-base lg:px-5 lg:py-2.5">
        {children}
      </div>
    );
}
