export default function PaginationButton({
  children,
  isCurrentPage,
  onClick,
}: {
  children: number | string;
  isCurrentPage?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`rounded border p-3 px-5 font-medium text-gray-700 ${isCurrentPage && "border-sky-600 text-sky-700"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
