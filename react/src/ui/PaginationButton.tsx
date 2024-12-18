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
        className={`rounded border p-3 px-5 font-medium text-gray-700 hover:border-sky-600 hover:text-sky-600 ${isCurrentPage && "border-sky-600 text-sky-700"}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  else
    return (
      <div className="inline-block rounded border p-3 px-5 font-medium text-gray-700">
        {children}
      </div>
    );
}
