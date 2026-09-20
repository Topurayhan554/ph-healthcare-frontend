import { Dispatch, SetStateAction, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

type PaginationItemType = number | "left-ellipsis" | "right-ellipsis";

const range = (start: number, end: number): number[] =>
  start > end
    ? []
    : Array.from({ length: end - start + 1 }, (_, i) => start + i);

const getButtonArray = (
  totalPages: number,
  page: number,
  siblingCount = 1,
  boundaryCount = 1,
): PaginationItemType[] => {
  if (!totalPages || Number.isNaN(totalPages) || totalPages < 1) return [];

  const totalNumbers = siblingCount * 2 + boundaryCount * 2 + 3;

  if (totalPages <= totalNumbers) {
    return range(1, totalPages);
  }

  const leftSiblingStart = Math.max(page - siblingCount, boundaryCount + 2);
  const rightSiblingEnd = Math.min(
    page + siblingCount,
    totalPages - boundaryCount - 1,
  );

  const showLeftEllipsis = leftSiblingStart > boundaryCount + 2;
  const showRightEllipsis = rightSiblingEnd < totalPages - boundaryCount - 1;

  const items: PaginationItemType[] = [];

  items.push(...range(1, boundaryCount));

  if (showLeftEllipsis) {
    items.push("left-ellipsis");
  } else {
    items.push(...range(boundaryCount + 1, leftSiblingStart - 1));
  }

  items.push(...range(leftSiblingStart, rightSiblingEnd));

  if (showRightEllipsis) {
    items.push("right-ellipsis");
  } else {
    items.push(...range(rightSiblingEnd + 1, totalPages - boundaryCount));
  }

  items.push(...range(totalPages - boundaryCount + 1, totalPages));

  return items;
};

interface Props {
  totalPages: number;
  handlePageChange: Dispatch<SetStateAction<number>>;
  page: number;
  siblingCount?: number;
  boundaryCount?: number;
}

export default function TablePagination({
  totalPages,
  handlePageChange,
  page,
  siblingCount = 1,
  boundaryCount = 1,
}: Props) {
  const buttons = useMemo(
    () => getButtonArray(totalPages, page, siblingCount, boundaryCount),
    [totalPages, page, siblingCount, boundaryCount],
  );

  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    handlePageChange(nextPage);
  };

  if (!totalPages || Number.isNaN(totalPages) || totalPages <= 1) {
    return null;
  }

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem key="previous">
          <PaginationPrevious
            href="#"
            aria-label="Go to previous page"
            onClick={(e) => {
              e.preventDefault();
              goToPage(page - 1);
            }}
            aria-disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : undefined}
            className={
              isFirstPage ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        {buttons.map((item, index) =>
          typeof item === "string" ? (
            <PaginationItem key={`${item}-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${item}`}>
              <PaginationLink
                href="#"
                aria-label={`Go to page ${item}`}
                aria-current={page === item ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(item);
                }}
                isActive={page === item}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem key="next">
          <PaginationNext
            href="#"
            aria-label="Go to next page"
            onClick={(e) => {
              e.preventDefault();
              goToPage(page + 1);
            }}
            aria-disabled={isLastPage}
            tabIndex={isLastPage ? -1 : undefined}
            className={
              isLastPage ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
