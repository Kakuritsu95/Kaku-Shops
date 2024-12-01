import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PaginationButton from "./PaginationButton";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  siblingsCount?: number;
}
export default function Pagination({
  currentPage,
  totalPages,
  siblingsCount = 2,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const firstPage = 1;
  const hasRightDots = totalPages - currentPage >= siblingsCount * 2;
  const hasRightAndLeftDots =
    totalPages - currentPage > siblingsCount && currentPage - siblingsCount > 1;
  const hasLeftDots = currentPage > siblingsCount * 2;
  const currentSearchParams = Object.fromEntries(searchParams);
  function setPage(page: number) {
    setSearchParams({ ...currentSearchParams, page: page.toString() });
  }

  function generateRange(start: number) {
    const length =
      siblingsCount * 2 >= totalPages ? totalPages : siblingsCount * 2 + 1;

    return Array.from({ length }, (_, i) => start + i);
  }

  function generatePages() {
    if (hasRightDots && !hasLeftDots) {
      return [firstPage, ...generateRange(2), "...", totalPages];
    }
    if (hasLeftDots && !hasRightDots) {
      return [
        firstPage,
        "...",
        ...generateRange(totalPages - siblingsCount * 2),
      ];
    }
    if (hasRightAndLeftDots) {
      return [
        firstPage,
        "...",
        ...generateRange(currentPage - siblingsCount),
        "...",
        totalPages,
      ];
    }
    return generateRange(1);
  }
  const pages = useMemo(generatePages, [
    hasLeftDots,
    hasRightDots,
    currentPage,
    totalPages,
    generatePages,
  ]);
  return (
    <div>
      <div className="mx-auto flex w-full justify-center md:w-2/3">
        <div className="space-x-3 pb-5">
          <PaginationButton
            onClick={() => {
              if (currentPage == 1) return;
              setPage(currentPage - 1);
            }}
          >
            Previous
          </PaginationButton>
          {totalPages &&
            pages.map((pageNum) =>
              typeof pageNum == "number" ? (
                <PaginationButton
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  isCurrentPage={currentPage == pageNum}
                >
                  {pageNum}
                </PaginationButton>
              ) : (
                <PaginationButton>...</PaginationButton>
              ),
            )}
          <PaginationButton
            onClick={() => {
              if (currentPage == totalPages) return;
              setPage(currentPage + 1);
            }}
          >
            Next
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}
